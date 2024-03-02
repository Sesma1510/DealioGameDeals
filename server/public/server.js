var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "dotenv/config";
import http from "http";
import { app } from "./app";
import { mongoConnect, mongoDisconnect } from "./services/mongo";
const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoConnect();
            server.listen(PORT, () => {
                console.log(`Listening on port ${PORT}...`);
            });
        }
        catch (error) {
            console.error(`Failed to start the server: ${error}`);
            process.exit(1);
        }
    });
}
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Closing MongoDB connection...');
    yield mongoDisconnect();
    server.close(() => {
        console.log('Server shut down gracefully.');
        process.exit(0);
    });
}));
startServer();
