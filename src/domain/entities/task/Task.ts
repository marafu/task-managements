import { UpdateStatusError } from "../../errors/UpdateStatusError";
import { Description } from "./Description";
import { Title } from "./Title";

export class Task {
  constructor(
    private id: string,
    readonly title: Title,
    readonly description: Description,
    private status: string,
    private externalId: string,
    private accountId: string
  ) {
    this.status = status ? status : "Todo";
  }

  getId(): string {
    return this.id;
  }

  getExternalId(): string {
    return this.externalId;
  }
  getAccountId(): string {
    return this.accountId;
  }

  getStatus(): string {
    return this.status;
  }

  updateStatusInProgress() {
    if (this.status === "Cancelled")
      throw new UpdateStatusError({
        message: "Não foi possível alterar o status de uma tarefa cancelada",
      });
    if (this.status === "Done")
      throw new UpdateStatusError({
        message: "Não foi possível alterar o status de Done para In Progress",
      });
    if (this.status === "Todo") {
      this.status = "In Progress";
    }
  }

  updateStatusDone() {
    if (this.status === "Cancelled")
      throw new UpdateStatusError({
        message: "Não foi possível alterar o status de uma tarefa cancelada",
      });
    if (this.status === "Todo")
      throw new UpdateStatusError({
        message: "A tarefa deve ser alterada para In Progress primeiro",
      });
    if (this.status === "In Progress") {
      this.status = "Done";
    }
  }

  cancelTask() {
    if (this.status != "") {
      this.status = "Cancelled";
    }
  }
}
