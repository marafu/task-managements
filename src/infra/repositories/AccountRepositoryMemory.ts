import { AccountRepository } from "../../application/repositories/AccountRepository";
import { Account } from "../../domain/entities/account/Account";

export class AccountRepositoryMemory implements AccountRepository {
  constructor(private accounts: Account[] = []) {}

  async save(account: Account): Promise<void> {
    this.accounts.push(account);
  }

  async getByEmail(email: string): Promise<Account | undefined> {
    for (const account of this.accounts)
      if (account.getEmail() === email) return account;
  }

  async getById(id: string): Promise<Account | undefined> {
    for (const account of this.accounts)
      if (account.getId() === id) return account;
  }

  async getByExternalId(external_id: string): Promise<Account | undefined> {
    for (const account of this.accounts)
      if (account.getExternalId() === external_id) return account;
  }
}
