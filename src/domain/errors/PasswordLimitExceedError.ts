import { DomainError } from "./DomainErrors";

export class PasswordLimitExceedError extends DomainError {
  constructor({ message }: { message: string }) {
    super();
    this.message = message;
  }
}
