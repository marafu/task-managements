import express, { Request, Response, Router } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import helmet from "helmet";
import { HttpServer } from "./HttpServer";
import BodyParserErrorHandler from "express-body-parser-error-handler";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load(path.resolve("./swagger.yaml"));
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
    this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
