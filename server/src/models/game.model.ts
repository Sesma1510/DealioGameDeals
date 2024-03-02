import mongoose, { Schema, Document } from "mongoose";
import axios from "axios";

export interface IGame extends Document {
  title: string;
  gameId: string; // CheapShark's gameID
  developers?: string[];
  publishers?: string[];
  releaseDate?: Date;
  genres?: string[];
  price: {
    currentPrice: number;
    historicalLow: number;
  };
  platforms?: string[];
  imageUrl?: string;
  storeLinks?: [{
    storeId: string;
    url: string;
  }];
}

const GameSchema: Schema = new Schema({
  title: { type: String, required: true },
  gameId: { type: String, required: true, unique: true },
  developers: [{ type: String }],
  publishers: [{ type: String }],
  releaseDate: { type: Date },
  genres: [{ type: String }],
  price: {
    currentPrice: { type: Number, required: true },
    historicalLow: { type: Number, required: true },
  },
  platforms: [{ type: String }],
  imageUrl: { type: String },
  storeLinks: [{
    storeId: { type: String, required: true },
    url: { type: String, required: true },
  }],
});


const CHEAPSHARK_API_URL = 'https://www.cheapshark.com/api/1.0/games';

// Function to search games by title using the CheapShark API
async function searchGamesByTitle(title: string) {
  try {
    const response = await axios.get(`${CHEAPSHARK_API_URL}`, {
      params: { title: title, limit: 60 },
    });

    if (response.status === 200 && response.data.length > 0) {
      return response.data; // Returns the list of games found
    } else {
      return []; // Returns an empty array if no games were found
    }
  } catch (error) {
    console.error('Error fetching games from CheapShark:', error);
    throw error; // It's better to throw the error to handle it in the route handler
  }
}

// Function to fetch games by title without updating the database
async function fetchGameByTitle(title: string) {
  const games = await searchGamesByTitle(title);
  return games; // Returns the games data directly
}

const Game = mongoose.model<IGame>('Game', GameSchema);

export { fetchGameByTitle };
