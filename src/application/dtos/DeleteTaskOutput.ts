import { Task } from "../../domain/entities/task/Task";

export class DeleteTaskOutput {
  message: string;
  constructor(task: Task) {
    this.message = `Task ${task.title} deleted successfully`;
  }
}
