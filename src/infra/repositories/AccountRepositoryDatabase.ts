import { Cipher } from "crypto";
import { AccountRepository } from "../../application/repositories/AccountRepository";
import { Account } from "../../domain/entities/account/Account";
import { DatabaseConnection } from "../database/DatabaseConnection";

export class AccountRepositoryDatabase implements AccountRepository {
  constructor(private connection: DatabaseConnection) {}
  async getByExternalId(external_id: string): Promise<Account | undefined> {
    const [data] = await this.connection.query(
      "SELECT id, external_id, name, email, password, password_algorithm, salt, verification_code, is_active, created_at FROM account WHERE external_id = ?",
      [external_id]
    );
    if (data.length === 0) return;
    const accountData = data[0];
    return Account.restore(
      accountData.id,
      accountData.external_id,
      accountData.name,
      accountData.email,
      accountData.password,
      accountData.password_algorithm,
      accountData.salt,
      accountData.verification_code,
      accountData.is_active,
      accountData.created_at
    );
  }
  async save(account: Account): Promise<void> {
    await this.connection.query(
      "INSERT INTO account(id, external_id, name, email, is_active, verification_code, password, password_algorithm, salt) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        account.getId(),
        account.getExternalId(),
        account.getName(),
        account.getEmail(),
        account.getIsActive(),
        account.getVerificationCode(),
        account.getPassword(),
        account.getPasswordAlgorithm(),
        account.getPasswordSalt(),
      ]
    );
  }
  async getByEmail(email: string): Promise<Account | undefined> {
    const [data] = await this.connection.query(
      "SELECT id, external_id, name, email, password, password_algorithm, salt, verification_code, is_active, created_at FROM account WHERE email = ?",
      [email]
    );
    if (data.length === 0) return;
    const accountData = data[0];
    return Account.restore(
      accountData.id,
      accountData.external_id,
      accountData.name,
      accountData.email,
      accountData.password,
      accountData.password_algorithm,
      accountData.salt,
      accountData.verification_code,
      accountData.is_active,
      accountData.created_at
    );
  }
  async getById(id: string): Promise<Account | undefined> {
    const [data] = await this.connection.query(
      "SELECT id, external_id, name, email, password, password_algorithm, salt, verification_code, is_active, created_at FROM account WHERE id = ?",
      [id]
    );
    if (data.length === 0) return;
    return Account.restore(
      data.id,
      data.external_id,
      data.name,
      data.email,
      data.password,
      data.password_algorithm,
      data.salt,
      data.verification_code,
      data.is_active,
      data.created_at
    );
  }
}
