import { BusinessError } from "./BusinessErrors";

export class InvalidInputError extends BusinessError {
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
