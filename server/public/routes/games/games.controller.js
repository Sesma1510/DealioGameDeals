var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { fetchAndUpdateGameByTitle, searchGamesByTitle as searchGamesByTitleModel } from '../../models/game.model';
const router = express.Router();
// Endpoint to fetch games from CheapShark by title and update/insert into the database
router.get('/searchAndUpdate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.query;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'A game title is required as a string.' });
    }
    try {
        yield fetchAndUpdateGameByTitle(title);
        res.status(200).json({ message: `Games with title '${title}' updated or inserted successfully.` });
    }
    catch (error) {
        console.error('Error fetching and updating games:', error);
        res.status(500).json({ error: 'Failed to fetch and update games.' });
    }
}));
// Endpoint to search games by title using the CheapShark API without updating the database
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.query;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'A game title is required as a string.' });
    }
    try {
        const games = yield searchGamesByTitleModel(title);
        res.json(games);
    }
    catch (error) {
        console.error('Error searching games by title:', error);
        res.status(500).json({ error: 'Failed to search games by title.' });
    }
}));
export { router as gamesRouter };
