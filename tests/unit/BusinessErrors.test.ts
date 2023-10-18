import { BusinessError } from "../../src/domain/errors/BusinessErrors";
import { UpdateStatusError } from "../../src/domain/errors/UpdateStatusError";

describe("Classe BusinessErrors", () => {
  test("Deve ser criado o BusinessError", () => {
    const sut = new BusinessError();
    expect(sut).toBeTruthy();
  });

  test("Deve ser criado o ChangeStatusError", () => {
    const sut = new UpdateStatusError({
      message: "error_message",
    });
    expect(sut.name).toBe("UPDATE_STATUS_ERROR");
    expect(sut.message).toBe("error_message");
  });
});
