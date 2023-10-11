export class BusinessError extends Error {
  constructor() {
    super();
  }
}

export class ChangeStatusError extends BusinessError {
  stack?: string | undefined;
  message: string;
  name: string;
  cause?: any;

  constructor({
    name,
    message,
    cause,
  }: {
    name?: string;
    message: string;
    cause?: any;
  }) {
    super();
    this.name = name ? name : "CHANGE_STATUS_ERROR";
    this.message = message;
    this.cause = cause;
  }
}
