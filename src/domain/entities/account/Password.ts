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

  private constructor(
    readonly value: string,
    readonly salt: string,
    readonly maxLength?: number
  ) {
    this.algorithm = "pbkdf2";
  }

  static create(password: string, maxLength?: number) {
    if (
      password.length < 8 &&
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&#])[A-Za-zd@$!%*?&#]{8,}/
      )
    )
      throw new PasswordInsecureError({
        message: `Could not signup your account. The password is lower 8 characters`,
      });

    if (maxLength)
      if (password.length > maxLength)
        throw new PasswordLimitExceedError({
          message: "You exceed password limit length. The P",
        });
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
    const value = crypto
      .pbkdf2Sync(password, this.salt, 100, 64, "sha512")
      .toString("hex");
    console.log(this.value);
    return this.value === value;
  }

  policyValidatePassword(password: string) {}
}

export class PasswordFactory {
  static create(algorithm: string) {
    if (algorithm === "pbkdf2") return PBKDF2Password;
    throw new Error();
  }
}
