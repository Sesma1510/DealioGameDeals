import axios from "axios";

const CHEAPSHARK_BASE_URL = 'https://www.cheapshark.com/api';
const API_VERSION = '1.0'; // This makes it easy to update the API version
const gamesEndpoint = `${CHEAPSHARK_BASE_URL}/${API_VERSION}/games`;

// Function to search games by title using the CheapShark API
async function searchGamesByTitle(title: string) {
  try {
    const response = await axios.get(gamesEndpoint, {
      params: { title: title, limit: 60 },
    });

    if (response.status === 200 && response.data.length > 0) {
      return response.data; // Returns the list of games found
    } else {
      return []; // Returns an empty array if no games were found
    }
  } catch (error) {
    console.error('Error fetching games from CheapShark:', error);
    throw error; // It's better to throw the error to handle it in the route handler
  }
}

// Function to fetch games by title without updating the database
async function fetchGameByTitle(title: string) {
  const games = await searchGamesByTitle(title);
  return games; // Returns the games data directly
}


export { fetchGameByTitle };
