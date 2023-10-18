import { Task } from "../../domain/entities/task/Task";

export interface TaskRepository {
  getById(id: string): Promise<Task | undefined>;
  getByExternalId(externalId: string): Promise<Task | undefined>;
  getByTitle(title: string): Promise<Task | undefined>;
  save(task: Task): Promise<void>;
  updateStatus(id: string, task: Task): Promise<Task>;
  deleteByTitle(title: string): Promise<void>;
}
