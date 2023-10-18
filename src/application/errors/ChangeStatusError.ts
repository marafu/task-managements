import { ApplicationError } from "./ApplicationError";

export class ChangeStatusError extends ApplicationError {
  constructor({ message }: { message: string }) {
    super();
    this.name = "CHANGE_STATUS_ERROR";
    this.message = message;
  }
}
