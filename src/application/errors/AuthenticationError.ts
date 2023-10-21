import { ApplicationError } from "./ApplicationError";

export class AuthenticationError extends ApplicationError {
  constructor({ message }: { message: string }) {
    super();
    this.message = message;
  }
}
