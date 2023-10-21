import jwt from "jsonwebtoken";
import { TokenPayload } from "../jwt/TokenPayload";
import { UpdateTaskInput } from "../../application/dtos/UpdateTaskInput";
import { ChangeStatusError } from "../../application/errors/ChangeStatusError";
import { AuthorizationError } from "../../application/errors/AuthorizationError";
import { AuthenticationError } from "../../application/errors/AuthenticationError";
import { DeleteTask } from "../../application/usecases/DeleteTask";
import { HttpServer } from "../http/HttpServer";

export class DeleteTaskController {
  constructor(
    readonly deleteTask: DeleteTask,
    readonly httpServer: HttpServer
  ) {}
  execute() {
    this.httpServer.on(
      "delete",
      "/task",
      async (params: any, headers: any, body: any) => {
        try {
          if (!headers.authorization)
            throw new AuthenticationError({ message: "Token is not provided" });
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Bearer")
            throw new AuthenticationError({ message: "Token is not provided" });
          const jwtToken = jwt.decode(token) as TokenPayload;
          const input = new UpdateTaskInput(jwtToken.id, body.taskId);
          const response = await this.deleteTask.execute(input);
          return {
            code: 200,
            response,
          };
        } catch (error: any) {
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
        }
      }
    );
  }
}
