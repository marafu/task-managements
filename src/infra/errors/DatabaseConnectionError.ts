import { RepositoryError } from "./RepositoryError";

export class DatabaseConnectionError extends RepositoryError {
  name: string;
  message: string;
  stack?: string | undefined;
  cause?: any;

  constructor({ message }: { message: string }) {
    super();
    this.name = "DATABASE_CONNECTION_ERROR";
    this.message = message;
  }
}
