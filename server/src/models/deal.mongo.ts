import { Document, Schema, model } from 'mongoose';

export interface IDeal extends Document {
  internalName: string;
  title: string;
  metacriticLink?: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText?: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}

const DealSchema: Schema = new Schema({
  internalName: { type: String, required: true },
  title: { type: String, required: true },
  metacriticLink: { type: String },
  dealID: { type: String, required: true },
  storeID: { type: String, required: true },
  gameID: { type: String, required: true },
  salePrice: { type: String, required: true },
  normalPrice: { type: String, required: true },
  isOnSale: { type: String, required: true },
  savings: { type: String, required: true },
  metacriticScore: { type: String, required: true },
  steamRatingText: { type: String },
  steamRatingPercent: { type: String, required: true },
  steamRatingCount: { type: String, required: true },
  steamAppID: { type: String, required: true },
  releaseDate: { type: Number, required: true },
  lastChange: { type: Number, required: true },
  dealRating: { type: String, required: true },
  thumb: { type: String, required: true },
});

const Deal = model<IDeal>('Deal', DealSchema);

export { Deal };
