import { BusinessError } from "./BusinessErrors";

export class ExternalIdError extends BusinessError {
  constructor({ message }: { message: string }) {
    super();
    this.name = "EXTERNAL_ID_ERROR";
    this.message = message;
  }
}
