import jwt from "jsonwebtoken";
import { TaskRepositoryDatabase } from "../../src/infra/repositories/TaskRepositoryDatabase";
import { MySQLPromiseConnectionAdapter } from "../../src/infra/database/MySQLPromiseConnectionAdapter";
import { DeleteTaskInput } from "../../src/application/dtos/DeleteTaskInput";
import { DeleteTask } from "../../src/application/usecases/DeleteTask";
import { DatabaseConnection } from "../../src/infra/database/DatabaseConnection";
import { AccountRepositoryDatabase } from "../../src/infra/repositories/AccountRepositoryDatabase";
import { TokenPayload } from "../../src/infra/jwt/TokenPayload";

let connection: DatabaseConnection;

beforeEach(function () {
  const config = {
    host: process.env.MYSQL_SERVICE_HOST || "",
    port: Number(process.env.MYSQL_SERVICE_PORT) || 3306,
    user: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "",
  };
  connection = new MySQLPromiseConnectionAdapter(config);
});

test("Deve excluir uma tarefa", async function () {
  const sut = new DeleteTask(
    new AccountRepositoryDatabase(connection),
    new TaskRepositoryDatabase(connection)
  );
  const [data] = await connection.query(
    'SELECT external_id, title, account_id, status FROM task WHERE status = "In Progress"',
    []
  );
  const [user] = await connection.query(
    "SELECT external_id FROM account WHERE id = ?",
    [data[0].account_id]
  );
  const input = {
    token: user[0].external_id,
    taskId: data[0].external_id,
  };
  const result = await sut.execute(input);
  expect(result.message).toBe(`Task ${data[0].title} deleted successfully`);
});

afterEach(async function () {
  await connection.close();
});
