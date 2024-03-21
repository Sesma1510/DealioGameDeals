import { Request } from 'express';

interface RequestWithUser extends Request {
  userId: string;
}


interface FetchDealsParams {
  dealID?: string;
  storeID?: string;
  upperPrice?: string;
  lowerPrice?: string;
  pageNumber?: string;
  pageSize?: string;
  sortBy?: string;
  desc?: string;
  metacritic?: string;
  steamRating?: string;
  maxAge?: string;
  steamAppID?: string;
  title?: string;
  exact?: string;
  AAA?: string;
  steamworks?: string;
  onSale?: string;
  output?: string;
}

export interface IDeal extends Document {
  internalName: string;
  title: string;
  metacriticLink?: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: number;
  normalPrice: number;
  isOnSale: boolean;
  savings: number;
  metacriticScore: number;
  steamRatingText?: string;
  steamRatingPercent: number;
  steamRatingCount: number;
  steamAppID: string;
  releaseDate: number;
  lastChange: number;
  dealRating: number;
  thumb: string;
}

export { RequestWithUser, FetchDealsParams, IDeal }
