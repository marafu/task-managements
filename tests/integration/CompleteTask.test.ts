import { CompleteTask } from "../../src/application/usecases/CompleteTask";
import { DatabaseConnection } from "../../src/infra/database/DatabaseConnection";
import { MySQLPromiseConnectionAdapter } from "../../src/infra/database/MySQLPromiseConnectionAdapter";
import { AccountRepositoryDatabase } from "../../src/infra/repositories/AccountRepositoryDatabase";
import { TaskRepositoryDatabase } from "../../src/infra/repositories/TaskRepositoryDatabase";

let connection: DatabaseConnection;

beforeAll(function () {
  const config = {
    host: process.env.MYSQL_SERVICE_HOST || "",
    port: Number(process.env.MYSQL_SERVICE_PORT) || 3306,
    user: process.env.MYSQL_USER || "",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "",
  };
  connection = new MySQLPromiseConnectionAdapter(config);
});

test("Deve finalizar uma tarefa que esteja em execução", async function () {
  const accountRepository = new AccountRepositoryDatabase(connection);
  const taskRepository = new TaskRepositoryDatabase(connection);
  const sut = new CompleteTask(accountRepository, taskRepository);
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
  expect(result.message).toBe(`Task ${data[0].title} updated to Done`);
});

afterEach(async function () {
  await connection.close();
});
