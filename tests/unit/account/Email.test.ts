import exp from "constants";
import { Email } from "../../../src/domain/entities/account/Email";
import { InvalidInputError } from "../../../src/domain/errors/InvalidInputError";

describe("Classe Email", function () {
  test("Deve criar um email com valor válido", function () {
    const email = new Email("matheus@localhost.local");
    expect(email).toBeDefined();
  });

  test("Não deve criar um email com valor inválido", function () {
    expect(() => new Email("matheuslocal.com")).toThrow(
      new InvalidInputError({ message: "Invalid email" })
    );
  });
});
