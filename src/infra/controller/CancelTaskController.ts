import jwt from "jsonwebtoken";
import { TokenPayload } from "../jwt/TokenPayload";
import { UpdateTaskInput } from "../../application/dtos/UpdateTaskInput";
import { ChangeStatusError } from "../../application/errors/ChangeStatusError";
import { AuthorizationError } from "../../application/errors/AuthorizationError";
import { AuthenticationError } from "../../application/errors/AuthenticationError";
import { CancelTask } from "../../application/usecases/CancelTask";
import { HttpServer } from "../http/HttpServer";

export class CancelTaskController {
  constructor(
    readonly cancelTask: CancelTask,
    readonly httpServer: HttpServer
  ) {}
  execute() {
    this.httpServer.on(
      "post",
      "/task/cancel",
      async (params: any, headers: any, body: any) => {
        try {
          if (!headers.authorization)
            throw new AuthenticationError({ message: "Token is not provided" });
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Token")
            throw new AuthenticationError({ message: "Token is not provided" });
          const jwtToken = jwt.decode(token) as TokenPayload;
          const input = new UpdateTaskInput(jwtToken.id, body.taskId);
          const response = await this.cancelTask.execute(input);
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
