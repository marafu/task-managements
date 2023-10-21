import jwt from "jsonwebtoken";
import { AuthenticationError } from "../../application/errors/AuthenticationError";
import { TokenPayload } from "../jwt/TokenPayload";
import { UpdateTaskInput } from "../../application/dtos/UpdateTaskInput";
import { StartTask } from "../../application/usecases/StartTask";
import { HttpServer } from "../http/HttpServer";
import { AuthorizationError } from "../../application/errors/AuthorizationError";
import { ChangeStatusError } from "../../application/errors/ChangeStatusError";

export class StartTaskController {
  constructor(readonly startTask: StartTask, readonly httpServer: HttpServer) {}

  execute() {
    this.httpServer.on(
      "post",
      "/task/start",
      async (params: any, headers: any, body: any) => {
        try {
          if (!headers.authorization)
            throw new AuthenticationError({ message: "Token is not provided" });
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Bearer")
            throw new AuthenticationError({ message: "Token is not provided" });
          const jwtToken = jwt.decode(token) as TokenPayload;
          const input = new UpdateTaskInput(jwtToken.id, body.taskId);
          const response = await this.startTask.execute(input);
          return {
            code: 201,
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
