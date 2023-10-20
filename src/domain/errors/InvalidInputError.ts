import { DomainError } from "./DomainErrors";

export class InvalidInputError extends DomainError {
  name: string;
  message: string;
  stack?: string | undefined;
  cause?: any;

  constructor({ message }: { message: string }) {
    super();
    this.name = "INVALID_INPUT_ERROR";
    this.message = message;
  }
}
