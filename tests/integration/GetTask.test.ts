import { GetTask } from "../../src/application/query/GetTask";
import { DatabaseConnection } from "../../src/infra/database/DatabaseConnection";
import { MySQLPromiseConnectionAdapter } from "../../src/infra/database/MySQLPromiseConnectionAdapter";

let connection: DatabaseConnection;

describe("Contexto listar tarefas", function () {
  beforeAll(function () {
    const config = {
      host: process.env.MYSQL_HOST || "172.21.140.84",
      user: process.env.MYSQL_USER || "user",
      password: process.env.MYSQL_PASSWORD || "password",
      database: process.env.MYSQL_DATABASE || "db",
    };
    connection = new MySQLPromiseConnectionAdapter(config);
  });

  test.skip("Deve listar todos as tarefas criada pelo usuário", async function () {
    const sut = new GetTask(connection);
    const input = {
      externalId: "20239e670f8064434651890250d532436317",
    };
    const result = await sut.execute(input.externalId);
    expect(result.owner).toBe("john.doe@localhost.local");
    expect(result.tasks.length).toBeGreaterThanOrEqual(2);
  });

  afterEach(async function () {
    await connection.close();
  });
});
