import { Request, Response } from 'express';
import { fetchStores, updateStoresIfNeeded } from '../../models/store.model';

async function getStores(req: Request, res: Response) {
  try {
    const stores = await fetchStores();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error trying to fetch stores', error: error.message });
  }
}

async function updateStores(req: Request, res: Response) {
  try {
    await updateStoresIfNeeded();
    res.json({ message: 'Stores have been updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating the stores', error: error.message });
  }
}

export { getStores, updateStores };
