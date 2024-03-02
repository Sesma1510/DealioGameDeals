import express from 'express';
import { Request, Response } from 'express';
import { fetchAndUpdateGameByTitle, searchGamesByTitle as searchGamesByTitleModel } from '../../models/game.model';

const router = express.Router();

// Endpoint to fetch games from CheapShark by title and update/insert into the database
router.get('/searchAndUpdate', async (req: Request, res: Response) => {
    const { title } = req.query;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'A game title is required as a string.' });
    }

    try {
        await fetchAndUpdateGameByTitle(title);
        res.status(200).json({ message: `Games with title '${title}' updated or inserted successfully.` });
    } catch (error) {
        console.error('Error fetching and updating games:', error);
        res.status(500).json({ error: 'Failed to fetch and update games.' });
    }
});

// Endpoint to search games by title using the CheapShark API without updating the database
router.get('/search', async (req: Request, res: Response) => {
    const { title } = req.query;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'A game title is required as a string.' });
    }

    try {
        const games = await searchGamesByTitleModel(title);
        res.json(games);
    } catch (error) {
        console.error('Error searching games by title:', error);
        res.status(500).json({ error: 'Failed to search games by title.' });
    }
});

export { router as gamesRouter };
