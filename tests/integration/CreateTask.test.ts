import jwt from "jsonwebtoken";
import { CreateTask } from "../../src/application/usecases/CreateTask";
import { TaskRepositoryDatabase } from "../../src/infra/repositories/TaskRepositoryDatabase";
import { MySQLPromiseConnectionAdapter } from "../../src/infra/database/MySQLPromiseConnectionAdapter";
import { CreateTaskInput } from "../../src/application/dtos/CreateTaskInput";
import { DatabaseConnection } from "../../src/infra/database/DatabaseConnection";
import { AccountRepositoryDatabase } from "../../src/infra/repositories/AccountRepositoryDatabase";
import { TokenPayload } from "../../src/infra/jwt/TokenPayload";

let connection: DatabaseConnection;

describe("Classe CreateTask", () => {
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

  test.skip("Deve persistir uma tarefa caso não exista no banco de dados", async function () {
    const sut = new CreateTask(
      new AccountRepositoryDatabase(connection),
      new TaskRepositoryDatabase(connection)
    );
    const token = jwt.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMjM5ZTY3MGY4MDY0NDM0NjUxODkwMjUwZDUzMjQzNjMxNyIsImlhdCI6MTY5NzU5ODcwNDE0MSwiZXhwaXJlc0luIjozNjAwfQ.E5Hmt87zdJ9dDKrh51VkqInm2LhC72Ob6YjkFUcce3Y"
    ) as TokenPayload;
    const taskInput = new CreateTaskInput(
      token.id,
      `title ${new Date().toISOString()}`,
      "description 2"
    );
    const result = await sut.execute(taskInput);
    expect(result.id).toBeTruthy();
  });

  afterEach(async function () {
    await connection.close();
  });
});
