import TokenGenerator from "../../domain/entities/account/TokenGenerator";
import { LoginInput } from "../dtos/LoginInput";
import { LoginOutput } from "../dtos/LoginOutput";
import { AccountNotExistError } from "../errors/AccountNotExistError";
import { AuthenticationError } from "../errors/AuthenticationError";
import { AccountRepository } from "../repositories/AccountRepository";

export class Login {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const account = await this.accountRepository.getByEmail(input.email);
    if (!account)
      throw new AccountNotExistError({ message: "Authentication failed" });
    if (!account.validatePassword(input.password))
      throw new AuthenticationError({ message: "Authentication failed" });
    if (!input.date) input.date = new Date();
    const token = TokenGenerator.generate(account, input.date);
    return {
      token,
    };
  }
}
