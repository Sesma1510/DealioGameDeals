import * as express from 'express';
import { Request, Response } from 'express';
import { fetchGameByTitle } from '../../models/game.model';


const router = express.Router();


// Endpoint to search games by title using the CheapShark API without updating the database
router.get('/', async (req: Request, res: Response) => {
    const { title } = req.query;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'A game title is required as a string.' });
    }

    try {
        const games = await fetchGameByTitle(title);
        res.json(games);
    } catch (error) {
        console.error('Error searching games by title:', error);
        res.status(500).json({ error: 'Failed to search games by title.' });
    }
});

export { router as gamesRouter };
