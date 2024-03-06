import { Request, Response } from 'express';
import { FetchDealsParams } from '../../types/types';
import { fetchDeals } from '../../models/deal.model';

async function handleDealsRequest(req: Request, res: Response) {
  try {
      // Convert query parameters to the expected type
      const params: FetchDealsParams = Object.fromEntries(Object.entries(req.query)) as FetchDealsParams;

      // Fetch deals or a single deal based on provided parameters
      const deals = await fetchDeals(params);
      return res.status(200).json(deals);
  } catch (error) {
      console.error('Error processing deals request:', error);
      return res.status(500).json({ error: 'Failed to process deals request.' });
  }
}

export { handleDealsRequest };

