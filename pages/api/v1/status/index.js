import database from "infra/database";

async function status(request, response) {
  const result = await database.query("SHOW server_version;");
  const maxConnectionsResult = await database.query("SHOW max_connections;");

  const databaseName = process.env.POSTGRES_DB;
  const openConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [databaseName],
  });

  const versionString = result.rows[0].server_version;
  const maxConnections = maxConnectionsResult.rows[0].max_connections;
  const openConnections = openConnectionsResult.rows[0].count;

  const versionMatch = versionString.match(/(\d+\.\d+)/);
  const version = versionMatch ? versionMatch[1] : null;

  const createdAt = new Date().toISOString();

  response.status(200).json({
    created_at: createdAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnections),
        opened_connextions: openConnections,
        version: version,
        ssl: true,
      },
    },
  });
}

export default status;
