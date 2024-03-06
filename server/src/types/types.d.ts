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


export { RequestWithUser, FetchDealsParams }
