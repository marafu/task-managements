import { ApplicationError } from "./ApplicationError";

export class DeleteTaskError extends ApplicationError {
  constructor({ message }: { message: string }) {
    super();
    this.name = "DELETE_TASK_ERROR";
    this.message = message;
  }
}
