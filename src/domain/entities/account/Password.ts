import crypto from "crypto";
import { PasswordLimitExceedError } from "../../errors/PasswordLimitExceedError";
import { PasswordInsecureError } from "../../errors/PasswordInsecureError";

export interface Password {
  value: string;
  salt: string;
  algorithm: string;
  validate(password: string): boolean;
}

export class PBKDF2Password implements Password {
  algorithm: string;
  private regexValidation =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&#])[A-Za-zd@$!%*?&#]{8,}";

  private constructor(
    readonly value: string,
    readonly salt: string,
    readonly minLength?: number,
    readonly maxLength?: number
  ) {
    this.algorithm = "pbkdf2";
    if (!minLength) this.minLength = 8;
  }

  static create(password: string) {
    const salt = crypto.randomBytes(20).toString("hex");
    const value = crypto
      .pbkdf2Sync(password, salt, 100, 64, "sha512")
      .toString("hex");
    return new PBKDF2Password(value, salt);
  }

  static restore(password: string, salt: string) {
    return new PBKDF2Password(password, salt);
  }

  validate(password: string): boolean {
    this.policyValidatePassword(password);
    const value = crypto
      .pbkdf2Sync(password, this.salt, 100, 64, "sha512")
      .toString("hex");
    return this.value === value;
  }

  private policyValidatePassword(password: string) {
    if (this.maxLength)
      if (password.length > this.maxLength)
        throw new PasswordLimitExceedError();
    if (!password.match(this.regexValidation))
      throw new PasswordInsecureError();
  }
}

export class PasswordFactory {
  static create(algorithm: string) {
    if (algorithm === "pbkdf2") return PBKDF2Password;
    throw new Error();
  }
}
