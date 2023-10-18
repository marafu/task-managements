import { TaskRepository } from "../../application/repositories/TaskRepository";
import { Task } from "../../domain/entities/task/Task";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { EntityNotFound } from "../errors/EntityNotFoundError";
import { RepositoryError } from "../errors/RepositoryError";

export class TaskRepositoryDatabase implements TaskRepository {
  constructor(private connection: DatabaseConnection) {}

  async getById(id: string): Promise<Task | undefined> {
    const [data] = await this.connection.query(
      "SELECT * FROM task WHERE id = ?",
      [id]
    );
    if (!data) return;
    return new Task(
      data.id,
      data.title,
      data.description,
      data.status,
      data.external_id,
      data.account_id
    );
  }

  async getByExternalId(externalId: string): Promise<Task | undefined> {
    const [data] = await this.connection.query(
      "SELECT * FROM task WHERE external_id = ?",
      [externalId]
    );
    if (data.length === 0) return;
    return new Task(
      data[0].id,
      data[0].title,
      data[0].description,
      data[0].status,
      data[0].external_id,
      data[0].account_id
    );
  }

  async getByTitle(title: string): Promise<Task | undefined> {
    const [data] = await this.connection.query(
      "SELECT * FROM task WHERE title = ?",
      [title]
    );
    if (!data) return;
    return new Task(
      data.id,
      data.title,
      data.description,
      data.status,
      data.external_id,
      data.account_id
    );
  }
  async save(task: Task): Promise<void> {
    await this.connection.query(
      "INSERT INTO task(id, external_id, title, description, status, account_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        task.getId(),
        task.getExternalId(),
        task.getTitle(),
        task.getDescription(),
        task.getStatus(),
        task.getAccountId(),
      ]
    );
  }
  async updateStatus(id: string, task: Task): Promise<Task> {
    const taskExists = await this.getById(id);
    if (!taskExists) throw new EntityNotFound({ message: "Task not exists" });
    await this.connection.query("UPDATE task SET status = ? WHERE id = ?", [
      task.getStatus(),
      id,
    ]);
    return taskExists;
  }

  async deleteByTitle(title: string): Promise<void> {
    await this.connection.query("DELETE FROM task WHERE title = ?", [title]);
  }
}
