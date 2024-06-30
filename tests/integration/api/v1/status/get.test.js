test("GET should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();

  expect(response.status).toBe(200);

  expect(responseBody.created_at).toBeDefined();

  const dateIso = new Date(responseBody.created_at).toISOString();
  expect(dateIso).toEqual(responseBody.created_at);

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.version).toEqual("16.0");

  expect(responseBody.dependencies.database.max_connections).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBe(100);
  expect(responseBody.dependencies.database.opened_connextions).toBeDefined();
  expect(responseBody.dependencies.database.opened_connextions).toBe(1);
});
