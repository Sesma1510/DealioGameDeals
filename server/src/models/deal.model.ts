import axios from "axios";
import { FetchDealsParams } from "../types/types";

const BASE_URL = 'https://www.cheapshark.com/api';
const API_VERSION = '1.0';

// Update function signature to accept pagination parameters
async function fetchDeals(params: FetchDealsParams, page?: number, pageSize?: number) {
  try {
    // Adjust params for the deals list to include pagination if provided
    const paginationParams = page && pageSize ? { pageNumber: page, pageSize } : {};

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
    // Combine original params with paginationParams
    const response = await axios.get(dealsListEndpoint, { params: { ...params, ...paginationParams } });

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
