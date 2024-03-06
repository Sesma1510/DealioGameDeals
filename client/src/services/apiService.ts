import axios from 'axios';

interface Game {
  gameID: string;
  external: string;
  thumb: string;
}

export const getGames = async (title: string): Promise<Game[]> => {
try {
  const response = await axios.get(`http://localhost:8000/games`, {
    params: { title: title || `lego` },
  });
  return response.data;
} catch (error) {
  console.error('Error fetching games:', error);
  throw error;
}
};
