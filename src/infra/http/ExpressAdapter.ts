import express, { Request, Response, Router } from "express";
import cors from "cors";
import helmet from "helmet";
import { HttpServer } from "./HttpServer";
import BodyParserErrorHandler from "express-body-parser-error-handler";

interface CallbackResponse {
  code: number;
  response: any;
}

export class ExpressAdapter implements HttpServer {
  app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(BodyParserErrorHandler());
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](
      url,
      async function (request: Request, response: Response) {
        const output: CallbackResponse = await callback(
          request.params,
          request.headers,
          request.body
        );
        response.status(output.code).json(output.response);
      }
    );
  }
  listen(port: number): void {
    this.app.listen(port);
  }
}
