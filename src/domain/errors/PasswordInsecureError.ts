import { DomainError } from "./DomainErrors";

export class PasswordInsecureError extends DomainError {
  constructor({ message }: { message: string }) {
    super();
    this.message = message;
  }
}
