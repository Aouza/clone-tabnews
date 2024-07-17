import database from "infra/database";

const cleanDatabase = async () => {
  await database.query("drop schema public cascade; create schema public;");
};

beforeAll(cleanDatabase);

test("GET should return 200 from api/migrations", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  const responseBody = await response.json();

  expect(response.status).toBe(200);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
