import { Task } from "../../domain/entities/task/Task";

export class UpdateTaskOutput {
  message: string;
  constructor(task: Task) {
    this.message = `Task ${task.title} updated to ${task.getStatus()}`;
  }
}
