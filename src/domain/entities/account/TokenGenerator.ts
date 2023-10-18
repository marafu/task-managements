import { sign } from "jsonwebtoken";

import { Account } from "./Account";

export default class TokenGenerator {
  static generate(account: Account, date: Date = new Date()) {
    const token = sign(
      {
        id: account.getExternalId(),
        iat: date.getTime() / 1000,
        expiresIn: 3600,
      },
      process.env.JWT_SECRET || ""
    );
    return token;
  }
}
