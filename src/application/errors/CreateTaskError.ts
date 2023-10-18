import { ApplicationError } from "./ApplicationError";

export class CreateTaskError extends ApplicationError {
  constructor({ message }: { message: string }) {
    super();
    this.name = "CREATE_TASK_ERROR";
    this.message = message;
  }
}
