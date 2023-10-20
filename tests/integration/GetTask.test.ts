import { GetTask } from "../../src/application/query/GetTask";
import { DatabaseConnection } from "../../src/infra/database/DatabaseConnection";
import { MySQLPromiseConnectionAdapter } from "../../src/infra/database/MySQLPromiseConnectionAdapter";

let connection: DatabaseConnection;

beforeAll(function () {
  const config = {
    host: process.env.DATABASE_HOST || "",
    port: Number(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER || "",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_DATABASE || "",
  };
  connection = new MySQLPromiseConnectionAdapter(config);
});

test("Deve listar todos as tarefas criada pelo usuário", async function () {
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
