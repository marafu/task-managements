import { RepositoryError } from "./RepositoryError";

export class EntityNotFound extends RepositoryError {
  name: string;
  message: string;
  stack?: string | undefined;
  cause?: any;

  constructor({ message }: { message: string }) {
    super();
    this.name = "ENTITY_NOT_FOUND";
    this.message = message;
  }
}
