import jwt from "jsonwebtoken";
import { Login } from "../../application/usecases/Login";
import { Signup } from "../../application/usecases/Signup";
import { CreateTask } from "../../application/usecases/CreateTask";
import { HttpServer } from "../http/HttpServer";
import { StartingTask } from "../../application/usecases/StartingTask";
import { CompletingTask } from "../../application/usecases/CompletingTask";
import { TokenPayload } from "../jwt/TokenPayload";
import { ChangeStatusInput } from "../../application/dtos/ChangeStatusInput";
import { GetTask } from "../../application/query/GetTask";
import { CancellingTask } from "../../application/usecases/CancellingTask";
import { ApplicationError } from "../../application/errors/ApplicationError";
import { ChangeStatusError } from "../../application/errors/ChangeStatusError";

export class MainController {
  constructor(
    readonly signup: Signup,
    readonly login: Login,
    readonly createTask: CreateTask,
    readonly getTask: GetTask,
    readonly startingTask: StartingTask,
    readonly completingTask: CompletingTask,
    readonly cancellingTask: CancellingTask,
    readonly httpServer: HttpServer
  ) {
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
      "/signup",
      async (params: any, headers: any, body: any) => {
        const response = await this.signup.execute(body);
        return {
          code: 200,
          response,
        };
      }
    );

    this.httpServer.on(
      "post",
      "/login",
      async (params: any, headers: any, body: any) => {
        const response = await this.login.execute(body);
        return {
          code: 200,
          response,
        };
      }
    );

    this.httpServer.on(
      "get",
      "/task",
      async (params: any, headers: any, body: any) => {
        try {
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Token") throw new Error();
          const jwtToken = jwt.verify(
            token,
            process.env.JWT_SECRET || "",
            {}
          ) as TokenPayload;
          const response = await this.getTask.execute(jwtToken.id);
          return {
            code: 200,
            response,
          };
        } catch (error) {
          if (error instanceof jwt.JsonWebTokenError) {
            throw new Error();
          }
          if (error instanceof jwt.TokenExpiredError) {
            throw new Error();
          }
        }
      }
    );

    this.httpServer.on(
      "post",
      "/task",
      async (params: any, headers: any, body: any) => {
        try {
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Token") throw new Error();
          const jwtToken = jwt.decode(token) as TokenPayload;
          const input = {
            token: jwtToken.id,
            title: body.title,
            description: body.description,
          };
          const response = await this.createTask.execute(input);
          return {
            code: 201,
            response,
          };
        } catch (error) {
          if (error instanceof ApplicationError) {
            return {
              code: 400,
              response: {
                message: error.message,
              },
            };
          }
          if (error instanceof jwt.JsonWebTokenError) {
            return {
              code: 401,
              response: {
                message: error.message,
              },
            };
          }
          if (error instanceof jwt.TokenExpiredError) {
            return {
              code: 401,
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
