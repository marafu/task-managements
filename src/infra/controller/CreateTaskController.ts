import { ApplicationError } from "../../application/errors/ApplicationError";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../jwt/TokenPayload";
import { TaskRepository } from "../../application/repositories/TaskRepository";
import { CreateTask } from "../../application/usecases/CreateTask";
import { HttpServer } from "../http/HttpServer";
import { AuthenticationError } from "../../application/errors/AuthenticationError";
import { AuthorizationError } from "../../application/errors/AuthorizationError";
import { ChangeStatusError } from "../../application/errors/ChangeStatusError";
import { Token } from "yaml/dist/parse/cst";
export class CreateTaskController {
  constructor(
    readonly taskController: TaskRepository,
    readonly createTask: CreateTask,
    readonly httpServer: HttpServer
  ) {}

  execute(): void {
    this.httpServer.on(
      "post",
      "/task",
      async (params: any, headers: any, body: any) => {
        try {
          if (!headers.authorization)
            throw new AuthenticationError({ message: "Token is not provided" });
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Bearer")
            throw new AuthenticationError({ message: "Token is not provided" });
          const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET || "", {
            complete: true,
          });

          const jwtToken = jwt.verify(token, process.env.JWT_SECRET || "") as {
            id: string;
            iat: any;
            expiredIn: any;
          };
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
        } catch (error: any) {
          console.trace(error);
          if (error instanceof jwt.JsonWebTokenError) {
            return {
              code: 401,
              response: { message: error.message },
            };
          }
          if (error instanceof jwt.TokenExpiredError) {
            return {
              code: 401,
              response: { message: error.message },
            };
          }
          if (error instanceof AuthenticationError) {
            return {
              code: 401,
              response: { message: error.message },
            };
          }
          if (error instanceof AuthorizationError) {
            return {
              code: 403,
              response: { message: error.message },
            };
          }
          if (error instanceof ChangeStatusError) {
            return {
              code: 400,
              response: {
                message: error.message,
              },
            };
          }
          return {
            code: 500,
            response: {
              message: "Internal Server Error",
            },
          };
        }
      }
    );
  }
}
