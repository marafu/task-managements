import { AccountNotExistError } from "../../application/errors/AccountNotExistError";
import { ApplicationError } from "../../application/errors/ApplicationError";
import { AuthenticationError } from "../../application/errors/AuthenticationError";
import { AccountRepository } from "../../application/repositories/AccountRepository";
import { Login } from "../../application/usecases/Login";
import { DomainError } from "../../domain/errors/DomainErrors";
import { HttpServer } from "../http/HttpServer";

export class LoginController {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly login: Login,
    readonly httpServer: HttpServer
  ) {}
  execute() {
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
          console.trace(error);
          if (error instanceof ApplicationError) {
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
