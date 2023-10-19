import { AuthorizationError } from "../errors/AuthorizationError";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../jwt/TokenPayload";
import { TaskRepository } from "../../application/repositories/TaskRepository";
import { GetTask } from "../../application/query/GetTask";
import { HttpServer } from "../http/HttpServer";

export class GetTaskController {
  constructor(
    readonly taskRepository: TaskRepository,
    readonly getTask: GetTask,
    readonly httpServer: HttpServer
  ) {}
  execute(): void {
    this.httpServer.on(
      "get",
      "/task",
      async (params: any, headers: any, body: any) => {
        try {
          if (!headers.authorization)
            throw new AuthorizationError({
              message: "Session token not provide",
            });
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
          if (error instanceof AuthorizationError) {
            return {
              code: 401,
              response: { message: error.message },
            };
          }
        }
      }
    );
  }
}
