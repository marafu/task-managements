import { Description } from "../../../src/domain/entities/task/Description";

describe("Classe Description", () => {
  test("Deve criar uma descrição", () => {
    const description = new Description("Uma breve descrição");
    expect(description.isValid()).toBeTruthy();
    expect(description.getValue()).toBe("Uma breve descrição");
  });

  test("Não deve criar uma descrição seja menor que 2 caracteres", () => {
    const description = new Description("U");
    expect(description.isValid()).toBeFalsy();
  });

  test("Não deve criar uma descrição seja maior que 1024", () => {
    const description = new Description("uma descrição muito grande", 20);
    expect(description.isValid()).toBeFalsy();
  });
});
