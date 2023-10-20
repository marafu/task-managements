import { Title } from "../../../src/domain/entities/task/Title";

describe("Classe Title", () => {
  test("Deve criar um titulo", () => {
    const title = new Title("Titulo");
    expect(title.isValid()).toBeTruthy();
    expect(title.value).toBe("Titulo");
  });

  test("Não deve criar um titulo vazio", function () {
    const title = new Title("");
    expect(title.isValid()).toBeFalsy();
  });

  test("Não deve criar um titulo que seja maior que 32 caracteres", function () {
    const title = new Title(
      "uma task que contem um numero muito alto de caracteres"
    );
    expect(title.isValid()).toBeFalsy();
  });

  test("Não deve criar um titulo que seja menor que 2 caracteres", function () {
    const title = new Title("A");
    expect(title.isValid()).toBeFalsy();
  });
});
