import { BusinessError } from "./BusinessErrors";

export class DuplicateTaskError extends BusinessError {
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
