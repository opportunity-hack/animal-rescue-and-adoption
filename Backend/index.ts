import { Database } from './database/Database';
import { Server } from './server/Server';

async function main() {
  const server = new Server();
  server.start();

  const db = new Database();
  await db.connect();
}

main().catch((error) => console.error(error));
