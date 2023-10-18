import { Task } from "../../domain/entities/task/Task";
import { TaskRepository } from "../../application/repositories/TaskRepository";
import { EntityNotFound } from "../errors/EntityNotFoundError";

export class TaskRepositoryMemory implements TaskRepository {
  private tasks: Task[];
  constructor() {
    this.tasks = [];
  }
  getByExternalId(externalId: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  deleteByTitle(title: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getById(id: string): Promise<Task | undefined> {
    for (const task of this.tasks) {
      if (task.getId() === id) return task;
    }
  }
  async getByTitle(title: string): Promise<Task | undefined> {
    for (const task of this.tasks) {
      if (task.getTitle() === title) return task;
    }
  }
  async save(task: Task): Promise<void> {
    this.tasks.push(task);
  }
  async updateStatus(id: string, task: Task): Promise<Task> {
    let taskExists = await this.getById(id);

    if (!taskExists) throw new EntityNotFound({ message: "Task not found" });

    taskExists = Object.assign(task, taskExists);

    return taskExists;
  }
}
