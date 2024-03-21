interface Store {
  storeID: number;
  storeName: string;
  image: string;
}
;
type ModalProps = {
  imageUrl: string;
  show: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
  top: number;
  left: number;
};


interface DataType {
  dealID: string;
  storeID: string;
  salePrice: string;
  title: string;
  dealRating: string;
  releaseDate: number;
  steamRatingText: string;
  lastChange: number;
  savings: string;
  uniqueKey: string;
}

export interface Game {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string | null;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}

export interface SearchParams {
  storeID?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  desc?: boolean;
  lowerPrice?: number;
  upperPrice?: number;
  metacritic?: number;
  steamRating?: number;
  maxAge?: number;
  steamAppID?: string;
  title?: string;
  exact?: boolean;
  AAA?: boolean;
  steamworks?: boolean;
  onSale?: boolean;
  output?: string;
}

export interface QueryParams extends SearchParams {
  [key: string]: string | number | boolean | undefined;
}


export { Game, Store, ModalProps, DataType, SearchParams, QueryParams };
