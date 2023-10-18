require("dotenv").config();
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { Login } from "./application/usecases/Login";
import { Signup } from "./application/usecases/Signup";
import { MySQLPromiseConnectionAdapter } from "./infra/database/MySQLPromiseConnectionAdapter";
import { AccountRepositoryDatabase } from "./infra/repositories/AccountRepositoryDatabase";
import { TaskRepositoryDatabase } from "./infra/repositories/TaskRepositoryDatabase";
import { MainController } from "./infra/controller/MainController";
import { CreateTask } from "./application/usecases/CreateTask";
import { GetTask } from "./application/query/GetTask";
import { StartingTask } from "./application/usecases/StartingTask";
import { CompletingTask } from "./application/usecases/CompletingTask";
import { CancellingTask } from "./application/usecases/CancellingTask";

const config = {
  host: process.env.MYSQL_HOST || "",
  user: process.env.MYSQL_USER || "",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "",
};
const connection = new MySQLPromiseConnectionAdapter(config);
const accountRepository = new AccountRepositoryDatabase(connection);
const taskRepository = new TaskRepositoryDatabase(connection);
const signup = new Signup(accountRepository);
const login = new Login(accountRepository);
const getTask = new GetTask(connection);
const startingTask = new StartingTask(
  accountRepository,
  taskRepository,
  getTask
);
const completingTask = new CompletingTask(
  accountRepository,
  taskRepository,
  getTask
);
const cancellingTask = new CancellingTask(
  accountRepository,
  taskRepository,
  getTask
);
const createTask = new CreateTask(accountRepository, taskRepository);
const httpServer = new ExpressAdapter();
new MainController(
  signup,
  login,
  createTask,
  getTask,
  startingTask,
  completingTask,
  cancellingTask,
  httpServer
);
httpServer.listen(Number(process.env.PORT) || 3000);
