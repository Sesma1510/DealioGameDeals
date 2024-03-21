import axios from 'axios';
import { IDeal } from '../types/types';

const BASE_URL = 'https://www.cheapshark.com/api/1.0';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchDeals = async (page: number, pageSize: number): Promise<IDeal[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/deals`, {
      params: { pageNumber: page, pageSize: pageSize }
    });

    if (response.status === 200 && response.data.length > 0) {
      await sleep(1000);
      return response.data as IDeal[];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching deals from CheapShark:', error);
    throw error;
  }
};

export { fetchDeals };
