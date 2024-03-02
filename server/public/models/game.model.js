var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema } from "mongoose";
import axios from "axios";
const GameSchema = new Schema({
    title: { type: String, required: true },
    gameId: { type: String, required: true, unique: true },
    developers: [{ type: String }],
    publishers: [{ type: String }],
    releaseDate: { type: Date },
    genres: [{ type: String }],
    price: {
        currentPrice: { type: Number, required: true },
        historicalLow: { type: Number, required: true },
    },
    platforms: [{ type: String }],
    imageUrl: { type: String },
    storeLinks: [{
            storeId: { type: String, required: true },
            url: { type: String, required: true },
        }],
});
const CHEAPSHARK_API_URL = 'https://www.cheapshark.com/api/1.0/games';
// Función para buscar juegos por título en la API de CheapShark
function searchGamesByTitle(title) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${CHEAPSHARK_API_URL}`, {
                params: { title: title, limit: 60 },
            });
            if (response.status === 200 && response.data.length > 0) {
                return response.data; // Retorna la lista de juegos encontrados
            }
            else {
                return []; // Retorna un arreglo vacío si no se encontraron juegos
            }
        }
        catch (error) {
            console.error('Error fetching games from CheapShark:', error);
            throw error;
        }
    });
}
// Función para transformar y actualizar/insertar un juego en la base de datos
function updateOrInsertGame(gameData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { gameID, external, cheapest, thumb } = gameData;
        const transformedGameData = {
            gameId: gameID,
            title: external,
            imageUrl: thumb,
            price: {
                currentPrice: cheapest,
                historicalLow: cheapest, // Assuming current price as historical low for simplicity
            },
            // Placeholder values for fields not available from CheapShark
            developers: [],
            publishers: [],
            platforms: [],
            storeLinks: [],
        };
        try {
            yield Game.findOneAndUpdate({ gameId: gameID }, transformedGameData, { upsert: true, new: true });
        }
        catch (error) {
            console.error('Error updating or inserting game:', error);
            throw error;
        }
    });
}
function fetchAndUpdateGameByTitle(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const games = yield searchGamesByTitle(title);
        for (const game of games) {
            yield updateOrInsertGame(game);
        }
    });
}
const Game = mongoose.model('Game', GameSchema);
export { searchGamesByTitle, updateOrInsertGame, fetchAndUpdateGameByTitle };
