import { DomainError } from "./DomainErrors";

export class UpdateStatusError extends DomainError {
  name: string;
  message: string;
  stack?: string | undefined;
  cause?: any;

  constructor({ message, cause }: { message: string; cause?: any }) {
    super();
    this.name = "UPDATE_STATUS_ERROR";
    this.message = message;
    this.cause = cause;
  }
}
