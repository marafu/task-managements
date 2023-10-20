import { DomainError } from "./DomainErrors";

export class PasswordLimitExceedError extends DomainError {
  constructor() {
    super();
  }
}
