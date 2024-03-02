import "dotenv/config";
import * as http from "http";
import { app } from "./app";
import { mongoConnect, mongoDisconnect } from "./services/mongo";

const PORT = process.env.PORT || 8000;

const server: http.Server = http.createServer(app);

async function startServer() {
  try {
    await mongoConnect();
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error(`Failed to start the server: ${error}`);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await mongoDisconnect();
  server.close(() => {
    console.log('Server shut down gracefully.');
    process.exit(0);
  });
});

startServer();
