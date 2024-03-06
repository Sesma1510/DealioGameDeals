import axios from "axios";

const BASE_URL = 'https://www.cheapshark.com/api';
const API_VERSION = '1.0';
const gamesEndpoint = `${BASE_URL}/${API_VERSION}/games`;

async function searchGamesByTitle(title: string) {
  try {
    const response = await axios.get(gamesEndpoint, {
      params: { title: title, limit: 60 },
    });

    if (response.status === 200 && response.data.length > 0) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching games from CheapShark:', error);
    throw error;
  }
}

async function fetchGameByTitle(title: string) {
  const games = await searchGamesByTitle(title);
  return games;
}


export { fetchGameByTitle };
