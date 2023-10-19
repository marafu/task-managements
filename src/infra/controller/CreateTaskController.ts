import { ApplicationError } from "../../application/errors/ApplicationError";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../jwt/TokenPayload";
import { TaskRepository } from "../../application/repositories/TaskRepository";
import { CreateTask } from "../../application/usecases/CreateTask";
import { HttpServer } from "../http/HttpServer";
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
  }
}
