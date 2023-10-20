import jwt from "jsonwebtoken";
import { CreateTask } from "../../src/application/usecases/CreateTask";
import { TaskRepositoryDatabase } from "../../src/infra/repositories/TaskRepositoryDatabase";
import { MySQLPromiseConnectionAdapter } from "../../src/infra/database/MySQLPromiseConnectionAdapter";
import { CreateTaskInput } from "../../src/application/dtos/CreateTaskInput";
import { DatabaseConnection } from "../../src/infra/database/DatabaseConnection";
import { AccountRepositoryDatabase } from "../../src/infra/repositories/AccountRepositoryDatabase";
import { TokenPayload } from "../../src/infra/jwt/TokenPayload";

let connection: DatabaseConnection;

beforeEach(function () {
  const config = {
    host: process.env.DATABASE_HOST || "",
    port: Number(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER || "",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_DATABASE || "",
  };
  connection = new MySQLPromiseConnectionAdapter(config);
});

test("Deve persistir uma tarefa caso não exista no banco de dados", async function () {
  const sut = new CreateTask(
    new AccountRepositoryDatabase(connection),
    new TaskRepositoryDatabase(connection)
  );
  const taskInput = new CreateTaskInput(
    "202359ce12eb3f194de88016cd992ccb9112",
    `title ${new Date().toISOString()}`,
    "description 2"
  );
  const result = await sut.execute(taskInput);
  expect(result.id).toBeTruthy();
});

afterEach(async function () {
  await connection.close();
});
