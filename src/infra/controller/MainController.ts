import jwt from "jsonwebtoken";
import { Login } from "../../application/usecases/Login";
import { CreateTask } from "../../application/usecases/CreateTask";
import { HttpServer } from "../http/HttpServer";
import { StartTask } from "../../application/usecases/StartTask";
import { CompleteTask } from "../../application/usecases/CompleteTask";
import { TokenPayload } from "../jwt/TokenPayload";
import { UpdateTaskInput } from "../../application/dtos/UpdateTaskInput";
import { CancelTask } from "../../application/usecases/CancelTask";
import { ChangeStatusError } from "../../application/errors/ChangeStatusError";
import { SignupController } from "./SignupController";
import { GetTaskController } from "./GetTaskController";
import { CreateTaskController } from "./CreateTaskController";
import { AccountNotExistError } from "../../application/errors/AccountNotExistError";
import { LoginController } from "./LoginController";
import { AuthenticationError } from "../../application/errors/AuthenticationError";
import { StartTaskController } from "./StartTaskController";
import { AuthorizationError } from "../../application/errors/AuthorizationError";
import { CompleteTaskController } from "./CompleteTaskController";
import { CancelTaskController } from "./CancelTaskController";

export class MainController {
  constructor(
    readonly signupController: SignupController,
    readonly loginController: LoginController,
    readonly createTaskController: CreateTaskController,
    readonly getTaskController: GetTaskController,
    readonly startTaskController: StartTaskController,
    readonly completeTaskController: CompleteTaskController,
    readonly cancelTaskController: CancelTaskController,
    readonly httpServer: HttpServer
  ) {
    signupController.execute();
    loginController.execute();
    getTaskController.execute();
    createTaskController.execute();
    startTaskController.execute();
    completeTaskController.execute();
    cancelTaskController.execute();
  }
}
