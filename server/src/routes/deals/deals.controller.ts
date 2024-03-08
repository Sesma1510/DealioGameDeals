import { Request, Response } from 'express';
import { cache } from '../../middleware/cacheManager';
import { FetchDealsParams } from '../../types/types';
import { fetchDeals } from '../../models/deal.model';

async function handleDealsRequest(req: Request, res: Response) {
  try {
    const params: FetchDealsParams = Object.fromEntries(Object.entries(req.query)) as FetchDealsParams;
    const cacheKey = JSON.stringify(params); // Use the query params as the cache key

    // Try to get data from cache
    const cachedDeals = cache.get(cacheKey);
    if (cachedDeals) {
      return res.status(200).json(cachedDeals);
    }

    // Fetch data from the external API if not cached
    const deals = await fetchDeals(params);

    // Save the fetched data in cache
    cache.set(cacheKey, deals, 3600); // Cache for 100 seconds, adjust as necessary

    return res.status(200).json(deals);
  } catch (error) {
    console.error('Error processing deals request:', error);
    return res.status(500).json({ error: 'Failed to process deals request.' });
  }
}

export { handleDealsRequest };

