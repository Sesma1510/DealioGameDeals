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

// Función para buscar juegos por título en la API de CheapShark
async function searchGamesByTitle(title: string) {
  try {
    const response = await axios.get(`${CHEAPSHARK_API_URL}`, {
      params: { title: title, limit: 60 },
    });

    if (response.status === 200 && response.data.length > 0) {
      return response.data; // Retorna la lista de juegos encontrados
    } else {
      return []; // Retorna un arreglo vacío si no se encontraron juegos
    }
  } catch (error) {
    console.error('Error fetching games from CheapShark:', error);
    throw error;
  }
}

// Función para transformar y actualizar/insertar un juego en la base de datos
async function updateOrInsertGame(gameData: any): Promise<void> {
  const { gameID, external, cheapest, thumb } = gameData;
  const transformedGameData = {
    gameId: gameID,
    title: external,
    imageUrl: thumb,
    price: {
      currentPrice: cheapest,
      historicalLow: cheapest, // Assuming current price as historical low for simplicity
    },
    // Placeholder values for fields not available from CheapShark
    developers: [],
    publishers: [],
    platforms: [],
    storeLinks: [],
  };

  try {
    await Game.findOneAndUpdate(
      { gameId: gameID },
      transformedGameData,
      { upsert: true, new: true }
      );
    } catch (error) {
      console.error('Error updating or inserting game:', error);
      throw error;
    }
  }

  async function fetchAndUpdateGameByTitle(title: string): Promise<void> {
    const games = await searchGamesByTitle(title);
    for (const game of games) {
      await updateOrInsertGame(game);
    }
  }

const Game = mongoose.model<IGame>('Game', GameSchema);

export { searchGamesByTitle, updateOrInsertGame, fetchAndUpdateGameByTitle};
