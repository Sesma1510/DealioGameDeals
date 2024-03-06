import axios from "axios";
import { FetchDealsParams } from "../types/types";

const BASE_URL = 'https://www.cheapshark.com/api';
const API_VERSION = '1.0';

async function fetchDeals(params: FetchDealsParams) {
  try {
    if (params.dealID) {
      const dealDetailsEndpoint = `${BASE_URL}/${API_VERSION}/deal`;
      const response = await axios.get(dealDetailsEndpoint, { params: { id: params.dealID } });

      if (response.status === 200) {
        return [response.data]; // Wrapping in an array for consistency
      } else {
        console.log("Failed to fetch deal by ID. Status:", response.status);
        return [];
      }
    }

    const dealsListEndpoint = `${BASE_URL}/${API_VERSION}/deals`;
    const response = await axios.get(dealsListEndpoint, { params });

    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Failed to fetch deals. Status:", response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching deals from CheapShark:', error);
    throw error;
  }
}


export { fetchDeals };
