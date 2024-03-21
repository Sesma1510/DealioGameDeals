import { IDeal } from '../types/types';
import { Schema, model } from 'mongoose';

const DealSchema: Schema = new Schema({
  internalName: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  metacriticLink: { type: String, trim: true },
  dealID: { type: String, required: true, unique: true, trim: true },
  storeID: { type: String, required: true, trim: true },
  gameID: { type: String, required: true, trim: true },
  salePrice: { type: Number, required: true, min: 0 },
  normalPrice: { type: Number, required: true, min: 0 },
  isOnSale: { type: Boolean, required: true },
  savings: { type: Number, required: true },
  metacriticScore: { type: Number },
  steamRatingText: { type: String },
  steamRatingPercent: { type: Number },
  steamRatingCount: { type: Number },
  steamAppID: { type: String, required: false },
  releaseDate: { type: Number, required: true },
  lastChange: { type: Number, required: true },
  dealRating: { type: Number, required: true },
  thumb: { type: String, required: true, trim: true },
}, { timestamps: true });

// Indexes
DealSchema.index({ title: 'text', internalName: 'text', steamRatingText: 'text' });

const Deal = model<IDeal>('Deal', DealSchema);

export { Deal };


