import { Title } from "./Title";

export class Task {
  private title: Title;
  private description: string;
  private status: string;

  private constructor(title: Title, description: string, status: string) {
    this.title = title;
    this.description = description;
    this.status = status;
  }

  static create(title: string, description: string, status: string) {
    return new Task(new Title(title), description, status);
  }
}
