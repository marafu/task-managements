import { Email } from "../../../src/domain/entities/account/Email";

describe("Classe Email", function () {
  test("Deve criar um email com valor válido", function () {
    const email = new Email("matheus@localhost.local");
    expect(email).toBeDefined();
  });
});
