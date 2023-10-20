import { DomainError } from "./DomainErrors";

export class DuplicateTaskError extends DomainError {
  name: string;
  message: string;
  stack?: string | undefined;
  cause?: any;

  constructor({ message }: { message: string }) {
    super();
    this.name = "DUPLICATED_TASK_ERROR";
    this.message = message;
  }
}
