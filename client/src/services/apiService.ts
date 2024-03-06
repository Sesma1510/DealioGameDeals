import axios from 'axios';

interface Game {
  gameID: string;
  title: string;
  thumb: string;
  salePrice: string;
  normalPrice: string;
  storeID: number;
}

interface Store{
  storeID: number;
  storeName: string;
  image: string;
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

export const getDeals = async (store: number): Promise<Game[]> => {
  try {
    const response = await axios.get(`http://localhost:8000/deals`, {
      params: { storeID: store || 1, sortBy: 'Recent' },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
  };
  
  export const getStores = async (): Promise<Store[]> => {
    try {
      const response = await axios.get(`http://localhost:8000/stores`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
    };
    