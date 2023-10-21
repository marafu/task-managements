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
import { StartTask } from "./application/usecases/StartTask";
import { CompleteTask } from "./application/usecases/CompleteTask";
import { CancelTask } from "./application/usecases/CancelTask";
import { SignupController } from "./infra/controller/SignupController";
import { CreateTaskController } from "./infra/controller/CreateTaskController";
import { GetTaskController } from "./infra/controller/GetTaskController";
import { LoginController } from "./infra/controller/LoginController";

const config = {
  host: process.env.DATABASE_HOST || "",
  port: Number(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER || "",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_DATABASE || "",
};
const connection = new MySQLPromiseConnectionAdapter(config);
const accountRepository = new AccountRepositoryDatabase(connection);
const taskRepository = new TaskRepositoryDatabase(connection);
const httpServer = new ExpressAdapter();
const signup = new Signup(accountRepository);
const login = new Login(accountRepository);
const getTask = new GetTask(connection);
const startTask = new StartTask(accountRepository, taskRepository);
const completeTask = new CompleteTask(accountRepository, taskRepository);
const cancelTask = new CancelTask(accountRepository, taskRepository);
const createTask = new CreateTask(accountRepository, taskRepository);
const signupController = new SignupController(
  accountRepository,
  signup,
  httpServer
);
const createTaskController = new CreateTaskController(
  taskRepository,
  createTask,
  httpServer
);
const getTaskController = new GetTaskController(
  taskRepository,
  getTask,
  httpServer
);
const loginController = new LoginController(
  accountRepository,
  login,
  httpServer
);
new MainController(
  signupController,
  loginController,
  createTaskController,
  getTaskController,
  startTask,
  completeTask,
  cancelTask,
  httpServer
);
httpServer.listen(Number(process.env.PORT) || 3000);
