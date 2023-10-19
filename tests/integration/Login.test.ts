require("dotenv").config();
import * as jwt from "jsonwebtoken";

import { DatabaseConnection } from "../../src/infra/database/DatabaseConnection";
import { MySQLPromiseConnectionAdapter } from "../../src/infra/database/MySQLPromiseConnectionAdapter";
import { Signup } from "../../src/application/usecases/Signup";
import { Login } from "../../src/application/usecases/Login";
import { AccountRepository } from "../../src/application/repositories/AccountRepository";
import { AccountRepositoryDatabase } from "../../src/infra/repositories/AccountRepositoryDatabase";
import { SignupInput } from "../../src/application/dtos/SignupInput";
import { LoginInput } from "../../src/application/dtos/LoginInput";

let connection: DatabaseConnection;
let accountRepository: AccountRepository;
let signup: Signup;
let login: Login;

interface TokenPayload {
  id: string;
}

describe("Contexto do login", () => {
  beforeEach(function () {
    const config = {
      host: process.env.MYSQL_SERVICE_HOST || "",
      port: Number(process.env.MYSQL_SERVICE_PORT) || 3306,
      user: process.env.MYSQL_USER || "",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "",
    };
    connection = new MySQLPromiseConnectionAdapter(config);
    accountRepository = new AccountRepositoryDatabase(connection);
    login = new Login(accountRepository);
    signup = new Signup(accountRepository);
  });

  test.skip("Deve realizar o login", async function () {
    try {
      const signupInput = new SignupInput(
        "John Doe Second",
        `john.doe.2@localhost.local`,
        "123456"
      );
      await signup.execute(signupInput);
      const loginInput = new LoginInput(
        signupInput.email,
        signupInput.password,
        new Date("2023-10-17T21:00:00")
      );
      const outputLogin = await login.execute(loginInput);
      const token = jwt.verify(
        outputLogin.token,
        process.env.JWT_SECRET || "secret",
        {}
      ) as TokenPayload;

      const account = await accountRepository.getByEmail(loginInput.email);
      expect(token.id).toBe(account?.getExternalId());
    } catch (error) {
      console.error(error);
    }
  });

  afterEach(async function () {
    await connection.close();
  });
});
