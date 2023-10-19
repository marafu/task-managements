import jwt from "jsonwebtoken";
import { Login } from "../../application/usecases/Login";
import { CreateTask } from "../../application/usecases/CreateTask";
import { HttpServer } from "../http/HttpServer";
import { StartingTask } from "../../application/usecases/StartingTask";
import { CompletingTask } from "../../application/usecases/CompletingTask";
import { TokenPayload } from "../jwt/TokenPayload";
import { ChangeStatusInput } from "../../application/dtos/ChangeStatusInput";
import { CancellingTask } from "../../application/usecases/CancellingTask";
import { ApplicationError } from "../../application/errors/ApplicationError";
import { ChangeStatusError } from "../../application/errors/ChangeStatusError";
import { SignupController } from "./SignupController";
import { GetTaskController } from "./GetTaskController";
import { CreateTaskController } from "./CreateTaskController";
import { AccountNotExistError } from "../../application/errors/AccountNotExistError";

export class MainController {
  constructor(
    readonly signupController: SignupController,
    readonly login: Login,
    readonly createTaskController: CreateTaskController,
    readonly getTaskController: GetTaskController,
    readonly startingTask: StartingTask,
    readonly completingTask: CompletingTask,
    readonly cancellingTask: CancellingTask,
    readonly httpServer: HttpServer
  ) {
    signupController.execute();
    getTaskController.execute();
    createTaskController.execute();

    this.httpServer.on(
      "get",
      "/hello",
      async (params: any, headers: any, body: any) => {
        return {
          code: 200,
          response: "Server on",
        };
      }
    );

    this.httpServer.on(
      "post",
      "/login",
      async (params: any, headers: any, body: any) => {
        try {
          const response = await this.login.execute(body);
          return {
            code: 200,
            response,
          };
        } catch (error: any) {
          console.log("Aqui");
          if (error instanceof AccountNotExistError) {
            return {
              code: 403,
              response: {
                message: error.message,
              },
            };
          }
        }
      }
    );

    this.httpServer.on(
      "post",
      "/task/start",
      async (params: any, headers: any, body: any) => {
        try {
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Token") throw new Error();
          const jwtToken = jwt.decode(token) as TokenPayload;
          const input = new ChangeStatusInput(jwtToken.id, body.taskId);
          const response = await this.startingTask.execute(input);
          return {
            code: 201,
            response,
          };
        } catch (error: any) {
          if (error instanceof ChangeStatusError) {
            if (error instanceof ChangeStatusError) {
              console.log(error.message);
              return {
                code: 400,
                response: {
                  message: error.message,
                },
              };
            }
          }
        }
      }
    );

    this.httpServer.on(
      "post",
      "/task/close",
      async (params: any, headers: any, body: any) => {
        try {
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Token") throw new Error();
          const jwtToken = jwt.decode(token) as TokenPayload;
          const input = new ChangeStatusInput(jwtToken.id, body.taskId);
          const response = await this.completingTask.execute(input);
          return {
            code: 201,
            response,
          };
        } catch (error: any) {
          if (error instanceof ChangeStatusError) {
            if (error instanceof ChangeStatusError) {
              console.log(error.message);
              return {
                code: 400,
                response: {
                  message: error.message,
                },
              };
            }
          }
        }
      }
    );

    this.httpServer.on(
      "post",
      "/task/cancel",
      async (params: any, headers: any, body: any) => {
        try {
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Token") throw new Error();
          const jwtToken = jwt.decode(token) as TokenPayload;
          const input = new ChangeStatusInput(jwtToken.id, body.taskId);
          const response = await this.cancellingTask.execute(input);
          return {
            code: 200,
            response,
          };
        } catch (error: any) {
          if (error instanceof ChangeStatusError) {
            console.log(error.message);
            return {
              code: 400,
              response: {
                message: error.message,
              },
            };
          }
        }
      }
    );
  }
}
