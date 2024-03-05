
import axios from 'axios';
import { Store } from './store.mongo';

async function fetchStores() {
  try {
    const response = await axios.get('https://www.cheapshark.com/api/1.0/stores');
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
}

async function updateStoresIfNeeded() {
  try {
    const storesData = await fetchStores();

    const storeUpdatePromises = storesData.map(async (storeDetail) => {
      const { storeID, ...updateData } = storeDetail;
      try {
        await Store.findOneAndUpdate(
          { storeID },
          updateData,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      } catch (updateError) {
        console.error(`Error updating store ${storeID}:`, updateError);
      }
    });

    await Promise.all(storeUpdatePromises);
  } catch (error) {
    console.error('Error updating stores:', error);
    throw error;
  }
}

export { fetchStores, updateStoresIfNeeded };
