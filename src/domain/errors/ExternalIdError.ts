import { DomainError } from "./DomainErrors";

export class ExternalIdError extends DomainError {
  constructor({ message }: { message: string }) {
    super();
    this.name = "EXTERNAL_ID_ERROR";
    this.message = message;
  }
}
