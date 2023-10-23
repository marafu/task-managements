import { Account } from "../../domain/entities/account/Account";
import { SignupInput } from "../dtos/SignupInput";
import { SignupOutput } from "../dtos/SignupOutput";
import { AccountExistError } from "../errors/AccountExistError";
import { AccountRepository } from "../repositories/AccountRepository";

export class Signup {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(input: SignupInput): Promise<SignupOutput> {
    const account = Account.create(input.name, input.email, input.password);
    const existingAccount = await this.accountRepository.getByEmail(
      input.email
    );
    if (existingAccount)
      throw new AccountExistError({ message: "Account already exists" });
    await this.accountRepository.save(account);
    return new SignupOutput("Signup successfully");
  }
}
