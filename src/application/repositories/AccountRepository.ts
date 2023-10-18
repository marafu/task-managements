import { Account } from "../../domain/entities/account/Account";

export interface AccountRepository {
  save(account: Account): Promise<void>;
  getByEmail(email: string): Promise<Account | undefined>;
  getById(id: string): Promise<Account | undefined>;
  getByExternalId(external_id: string): Promise<Account | undefined>;
}
