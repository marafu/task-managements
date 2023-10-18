import { InvalidInputError } from "../../errors/InvalidInputError";

export class Email {
  private value: string;

  constructor(email: string) {
    if (!email.match(/^(.+)@(.+)$/))
      throw new InvalidInputError({ message: "Invalid email" });
    this.value = email;
  }

  getValue() {
    return this.value;
  }
}
