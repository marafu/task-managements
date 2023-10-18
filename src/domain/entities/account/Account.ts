import { Email } from "./Email";
import { ExternalId } from "./ExternalId";
import { Name } from "./Name";
import { PBKDF2Password, Password, PasswordFactory } from "./Password";

export class Account {
  constructor(
    private id: string,
    private externalId: string,
    private name: Name,
    private email: Email,
    private password: Password,
    private verificationCode: string,
    private isActive: boolean,
    private date: Date = new Date()
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name.getValue();
  }

  getEmail(): string {
    return this.email.getValue();
  }

  getPassword(): string {
    return this.password.value;
  }

  getPasswordAlgorithm(): string {
    return this.password.algorithm;
  }

  getPasswordSalt(): string {
    return this.password.salt;
  }
  validatePassword(password: string) {
    return this.password.validate;
  }
  getExternalId(): string {
    return this.externalId;
  }

  getVerificationCode(): string {
    return this.verificationCode;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  getDate(): Date {
    return this.date;
  }

  static create(name: string, email: string, password: string) {
    const accountId = crypto.randomUUID();
    const date = new Date();
    const externalId = new ExternalId(accountId, new Date());
    const verificationCode = crypto.randomUUID();
    return new Account(
      accountId,
      externalId.getValue(),
      new Name(name),
      new Email(email),
      PBKDF2Password.create(password),
      verificationCode,
      false,
      date
    );
  }

  static restore(
    id: string,
    externalId: string,
    name: string,
    email: string,
    password: string,
    passwordAlgorithm: string,
    salt: string,
    verificationCode: string,
    isActive: boolean,
    date: Date = new Date()
  ) {
    return new Account(
      id,
      externalId,
      new Name(name),
      new Email(email),
      PasswordFactory.create(passwordAlgorithm).restore(password, salt),
      verificationCode,
      isActive,
      date
    );
  }
}
