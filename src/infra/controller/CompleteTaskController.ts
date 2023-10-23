import jwt from "jsonwebtoken";
import { TokenPayload } from "../jwt/TokenPayload";
import { UpdateTaskInput } from "../../application/dtos/UpdateTaskInput";
import { AuthenticationError } from "../../application/errors/AuthenticationError";
import { AuthorizationError } from "../../application/errors/AuthorizationError";
import { ChangeStatusError } from "../../application/errors/ChangeStatusError";
import { CompleteTask } from "../../application/usecases/CompleteTask";
import { HttpServer } from "../http/HttpServer";

export class CompleteTaskController {
  constructor(
    readonly completeTask: CompleteTask,
    readonly httpServer: HttpServer
  ) {}
  execute() {
    this.httpServer.on(
      "post",
      "/task/close",
      async (params: any, headers: any, body: any) => {
        try {
          if (!headers.authorization)
            throw new AuthenticationError({ message: "Token is not provided" });
          const [schema, token] = headers.authorization.split(" ");
          if (schema != "Bearer")
            throw new AuthenticationError({ message: "Token is not provided" });
          const jwtToken = jwt.verify(token, process.env.JWT_SECRET || "") as {
            id: string;
            iat: any;
            expiredIn: any;
          };
          const input = new UpdateTaskInput(jwtToken.id, body.taskId);
          const response = await this.completeTask.execute(input);
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
