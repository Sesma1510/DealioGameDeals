import axios from "axios";

// Define API base URL and version
const CHEAPSHARK_BASE_URL = 'https://www.cheapshark.com/api';
const API_VERSION = '1.0'; // This makes it easy to update the API version
const dealsEndpoint = `${CHEAPSHARK_BASE_URL}/${API_VERSION}/deals`;

async function fetchDeals(storeID: string, upperPrice: string) {
  try {
    const response = await axios.get(dealsEndpoint, {
      params: { storeID, upperPrice },
    });

    if (response.status === 200) {
      console.log("Deals fetched successfully:", response.data);
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

export { fetchDeals  };
