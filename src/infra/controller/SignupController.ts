import { AccountExistError } from "../../application/errors/AccountExistError";
import { AccountRepository } from "../../application/repositories/AccountRepository";
import { Signup } from "../../application/usecases/Signup";
import { HttpServer } from "../http/HttpServer";

export class SignupController {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly signup: Signup,
    readonly httpServer: HttpServer
  ) {}
  execute(): void {
    this.httpServer.on(
      "post",
      "/signup",
      async (params: any, headers: any, body: any) => {
        try {
          const response = await this.signup.execute(body);
          return {
            code: 200,
            response: {
              id: response.accountId,
            },
          };
        } catch (error: any) {
          if (error instanceof AccountExistError)
            return {
              code: 400,
              response: { message: error.message },
            };
        }
      }
    );
  }
}
