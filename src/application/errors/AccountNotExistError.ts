import { ApplicationError } from "./ApplicationError";

export class AccountNotExistError extends ApplicationError {
  constructor({ message }: { message: string }) {
    super();
    this.message = message;
  }
}
