import  { Schema, Document, model } from "mongoose";

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

const Game = model<IGame>('Game', GameSchema);

export { Game };
