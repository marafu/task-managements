import { InvalidInputError } from "../../errors/InvalidInputError";

export class Name {
  constructor(private value: string, private denyValues?: string[]) {
    if (!value.match(/^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/))
      throw new InvalidInputError({ message: "Invalid name" });
    if (denyValues)
      for (const denyValue of denyValues) {
        if (denyValue.toLocaleUpperCase().includes(denyValue))
          throw new InvalidInputError({ message: "Invalid name" });
      }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}
