import { Name } from "../../../src/domain/entities/account/Name";

describe("Classe Name", function () {
  test("Deve criar um nome com valor válido", function () {
    const name = new Name("Matheus");
    expect(name).toBeDefined();
  });
});
