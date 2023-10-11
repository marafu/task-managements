import { BusinessError, ChangeStatusError } from "./BusinessErrors";
import { Description } from "./Description";
import { Title } from "./Title";

export class Task {
  private title: Title;
  private description: Description;
  private status: string;

  private constructor(title: Title, description: Description, status: string) {
    this.title = title;
    this.description = description;
    this.status = status;
  }

  static create(title: string, description: string): Task {
    return new Task(new Title(title), new Description(description), "Todo");
  }

  getTitle(): string {
    return this.title.getValue();
  }

  getDescription(): string {
    return this.description.getValue();
  }

  getStatus(): string {
    return this.status;
  }

  changeStatusInProgress() {
    if (this.status === "Cancelled")
      throw new ChangeStatusError({
        message: "Não foi possível alterar o status de uma tarefa cancelada",
      });
    if (this.status === "Done")
      throw new ChangeStatusError({
        message: "Não foi possível alterar o status de Done para In Progress",
      });
    if (this.status === "Todo") {
      this.status = "In Progress";
    }
  }

  changeStatusDone() {
    if (this.status === "Cancelled")
      throw new ChangeStatusError({
        message: "Não foi possível alterar o status de uma tarefa cancelada",
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
