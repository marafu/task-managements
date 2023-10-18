import { Account } from "../../domain/entities/account/Account";
import { SignupInput } from "../dtos/SignupInput";
import { SignupOutput } from "../dtos/SignupOutput";
import { AccountRepository } from "../repositories/AccountRepository";

export class Signup {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(input: SignupInput): Promise<SignupOutput> {
    const existingAccount = await this.accountRepository.getByEmail(
      input.email
    );
    if (existingAccount) throw new Error("Account already exists");
    const account = Account.create(input.name, input.email, input.password);
    await this.accountRepository.save(account);
    return {
      accountId: account.getId(),
    };
  }
}
