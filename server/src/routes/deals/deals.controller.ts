import axios from 'axios';
import { Request, Response } from 'express';
import { getPagination } from '../../services/pagination';

const BASE_URL = 'https://www.cheapshark.com/api/1.0';

async function fetchInitialDeals(req: Request, res: Response) {
  const { pageNumber, pageSize } = getPagination(req.query);

  try {
    const response = await axios.get(`${BASE_URL}/deals`, {
      params: {
        pageNumber,
        pageSize,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching initial deals:', error);
    res.status(500).json({ error: 'Failed to fetch initial deals.' });
  }
}

async function fetchDealsOnUserQuery(req: Request, res: Response) {
  const { title, storeID, upperPrice, lowerPrice, steamRating, metacritic, sortBy, onSale, pageNumber } = req.query;

  try {
    const params: any = {
      title,
      storeID,
      upperPrice,
      lowerPrice,
      steamRating,
      metacritic,
      onSale,
      pageNumber,
    };

    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === '') {
        delete params[key];
      }
    });

    if (sortBy) {
      params.sortBy = sortBy;
    }

    const response = await axios.get(`${BASE_URL}/deals`, { params });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching deals on user query:', error);
    res.status(500).json({ error: 'Failed to fetch deals on user query.' });
  }
}

export  { fetchInitialDeals, fetchDealsOnUserQuery };
