const { exec } = require("node:child_process");

const checkPostgres = () => {
  const handleReturn = (error, stdout) => {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();

      return;
    }

    console.log("\n\n✨ Postgres está pronto e aceitando conexões\n\n");
  };

  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
};

process.stdout.write("\n\n⛔︎ Aguardando postgres aceitar conexões");

checkPostgres();
