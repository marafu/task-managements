import { GetTask } from "../../src/application/query/GetTask";
import { CompletingTask } from "../../src/application/usecases/CompletingTask";
import { DatabaseConnection } from "../../src/infra/database/DatabaseConnection";
import { MySQLPromiseConnectionAdapter } from "../../src/infra/database/MySQLPromiseConnectionAdapter";
import { AccountRepositoryDatabase } from "../../src/infra/repositories/AccountRepositoryDatabase";
import { TaskRepositoryDatabase } from "../../src/infra/repositories/TaskRepositoryDatabase";

let connection: DatabaseConnection;

describe("Contexto finalizando tarefa", function () {
  beforeAll(function () {
    const config = {
      host: process.env.MYSQL_HOST || "",
      user: process.env.MYSQL_USER || "",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "",
    };
    connection = new MySQLPromiseConnectionAdapter(config);
  });

  test.skip("Deve finalizar uma tarefa que esteja em execução", async function () {
    const accountRepository = new AccountRepositoryDatabase(connection);
    const taskRepository = new TaskRepositoryDatabase(connection);
    const getTask = new GetTask(connection);
    const sut = new CompletingTask(accountRepository, taskRepository, getTask);
    const [data] = await connection.query(
      'SELECT external_id FROM task WHERE status = "In Progress"',
      []
    );
    const input = {
      token: "20239e670f8064434651890250d532436317",
      taskId: data[0].external_id,
    };
    const result = await sut.execute(input);
    expect(result).toBe("Task changed for Done");
  });

  afterEach(async function () {
    await connection.close();
  });
});
