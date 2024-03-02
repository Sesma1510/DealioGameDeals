import * as express from "express";
import { Request, Response } from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import * as path from "path";
import { gamesRouter } from "./routes/games/games.controller";

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/games', gamesRouter);

// Fallback para SPA
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export { app };
