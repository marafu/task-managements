import uuid from "uuid";
import { ExternalIdError } from "../../errors/ExternalIdError";
export class ExternalId {
  private value: string;
  constructor(accountId: string, date: Date = new Date()) {
    const replacedValue = accountId.replaceAll("-", "");
    this.value = `${date.getFullYear()}${replacedValue}`;
  }

  getValue(): string {
    return this.value;
  }
}
