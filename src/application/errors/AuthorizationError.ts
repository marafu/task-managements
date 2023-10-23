import { ApplicationError } from "./ApplicationError";

export class AuthorizationError extends ApplicationError {
  constructor({ message }: { message: string }) {
    super();
    this.message = message;
  }
}
