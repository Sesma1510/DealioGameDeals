import { Request, Response } from 'express';
import { fetchDeals } from '../../models/deal.model';

async function getDeals(req: Request, res: Response) {
  try {
    const { storeID, upperPrice } = req.query;

    // Validate query parameters
    if (!storeID || !upperPrice) {
      return res.status(400).json({ error: 'Missing required query parameters: storeID and upperPrice.' });
    }

    const deals = await fetchDeals(storeID as string, upperPrice as string);
    return res.status(200).json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    return res.status(500).json({ error: 'Failed to fetch deals.' });
  }
}

export { getDeals };
