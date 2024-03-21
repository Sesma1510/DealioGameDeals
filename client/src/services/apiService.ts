import axios from 'axios';
import { Game, QueryParams, SearchParams } from '../types/types';

const BASE_URL = 'http://localhost:8000';

// Updated to include pageNumber for pagination support
export const getInitialDeals = async (pageNumber: number = 0, pageSize: number = 60, sortBy: string = 'Deal Rating'): Promise<Game[]> => {
  try {
    const response = await axios.get<Game[]>(`${BASE_URL}/deals/initial`, {
      params: { pageNumber, pageSize, sortBy },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching initial deals:', error);
    throw error;
  }
};

export const searchDeals = async (searchParams: SearchParams): Promise<Game[]> => {
  const params: QueryParams = {
    ...searchParams,
    sortBy: searchParams.sortBy ?? 'Deal Rating',
    pageNumber: searchParams.pageNumber ?? 0,
    pageSize: searchParams.pageSize ?? 60, // Include pageSize if your search also supports pagination
  };
  // Remove undefined or null parameters
  Object.keys(params).forEach(key => params[key] == null && delete params[key]);

  try {
    const response = await axios.get<Game[]>(`${BASE_URL}/deals/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Error during the deal search:', error);
    throw error;
  }
};
