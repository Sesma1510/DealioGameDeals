import { Request, Response, NextFunction } from 'express';
import { fetchGameByTitle } from '../../models/game.model';

async function fetchGamesList(req: Request, res: Response) {
  const { title } = req.query;
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'A game title is required.' });
  }

  try {
    const games = await fetchGameByTitle(title);
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games.' });
  }
};

export { fetchGamesList };
