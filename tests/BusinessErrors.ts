import { BusinessError, ChangeStatusError } from "../src/BusinessErrors";

describe("Classe BusinessErrors", () => {
  test("Deve ser criado o BusinessError", () => {
    const sut = new BusinessError();
    expect(sut).toBeTruthy();
  });

  test("Deve ser criado o ChangeStatusError", () => {
    const sut = new ChangeStatusError({
      message: "error_message",
    });
    expect(sut.name).toBe("CHANGE_STATUS_ERROR");
    expect(sut.message).toBe("error_message");
  });
});
