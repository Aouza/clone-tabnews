import migrationRunner from "node-pg-migrate";
import { join } from "path";

import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];

  if (!allowedMethods.includes(request.method)) {
    return response
      .status(405)
      .json(`This method "${request.method}"is not allowed`);
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrations = {
      dbClient,
      dir: join("infra", "migrations"),
      direction: "up",
      dryRun: false,
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner({ ...defaultMigrations });
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrations,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
