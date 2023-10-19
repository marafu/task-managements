import { ApplicationError } from "./ApplicationError";

export class AccountExistError extends ApplicationError {
  constructor({ message }: { message: string }) {
    super();
    this.message = message;
  }
}
