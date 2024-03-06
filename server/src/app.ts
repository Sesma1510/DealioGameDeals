import * as express from "express";
import { Request, Response } from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import * as path from "path";
import { api } from "./routes/api";
import { limiter } from "./middleware/rateLimiter";

const app = express();

app.use(limiter);

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client' ,'public')));

app.use('/', api);

// Fallback para SPA
app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

export { app };
