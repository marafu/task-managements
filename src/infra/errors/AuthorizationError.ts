import { ControllerError } from "./ControllerError";

export class AuthorizationError extends ControllerError {
  constructor({ message }: { message: string }) {
    super();
    this.message = message;
  }
}
