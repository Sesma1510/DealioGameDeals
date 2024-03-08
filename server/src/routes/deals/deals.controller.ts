import { Request, Response } from 'express';
import { cache } from '../../middleware/cacheManager';
import { getPagination } from '../../services/pagination';
import { FetchDealsParams } from '../../types/types';
import { fetchDeals } from '../../models/deal.model';

async function handleDealsRequest(req: Request, res: Response) {
  try {
    const params: FetchDealsParams = Object.fromEntries(Object.entries(req.query)) as FetchDealsParams;
    // Extract pagination parameters using getPagination or directly from req.query
    const { skip, limit } = getPagination(req.query);

    // Convert skip and limit to pageNumber and pageSize if necessary
    const page = skip / limit + 1;
    const pageSize = limit;

    const cacheKey = JSON.stringify({ ...params, page, pageSize }); // Updated cacheKey to include pagination

    // Try to get data from cache
    const cachedDeals = cache.get(cacheKey);
    if (cachedDeals) {
      return res.status(200).json(cachedDeals);
    }

    // Fetch data from the external API if not cached, now including pagination parameters
    const deals = await fetchDeals(params, page, pageSize);

    // Save the fetched data in cache
    cache.set(cacheKey, deals, 3600); // Cache for 1 hour

    return res.status(200).json(deals);
  } catch (error) {
    console.error('Error processing deals request:', error);
    return res.status(500).json({ error: 'Failed to process deals request.' });
  }
}

export { handleDealsRequest };

