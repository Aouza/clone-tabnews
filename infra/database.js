import { Client } from "pg";

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();
  return client;
};

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);

    return result;
  } catch (err) {
    console.log({ err });
  } finally {
    client.end();
  }
}

export default {
  query,
  getNewClient,
};
