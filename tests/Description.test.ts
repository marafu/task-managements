import { Description } from "../src/Description";

describe("Classe Description", () => {
  test("Deve criar uma descrição", () => {
    const description = new Description("Uma breve descrição");
    expect(description.getValue()).toBe("Uma breve descrição");
  });
});
