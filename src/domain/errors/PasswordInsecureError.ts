import { DomainError } from "./DomainErrors";

export class PasswordInsecureError extends DomainError {
  constructor() {
    super();
  }
}
