import express, { Application } from 'express';
import cors from 'cors';
import { Globals } from '../library/Globals/Globals';
import { LoggerUtils } from '../library/Utilities/LoggerUtils';
import { GetRouter } from './Routes/Get';
import { HttpStatusCode } from 'axios';
// Import other routers as needed

export class Server {
  private readonly app: Application;
  private readonly port: number | string;

  constructor() {
    this.app = express();
    this.port = Globals.PORT;

    this.configureMiddleware();
    this.configureRoutes();
    // this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
      })
    );

    this.app.use(express.json());
  }

  private configureRoutes(): void {
    this.app.use('/api', new GetRouter().router);
  }

  private configureErrorHandling(): void {
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        LoggerUtils.error(`Error: ${err}`);
        res
          .status(HttpStatusCode.InternalServerError)
          .json({ message: 'Internal Server Error' });
      }
    );
  }

  public start(): void {
    this.app.listen(Number(this.port), '0.0.0.0', () => {
      LoggerUtils.info(`Server is running on port ${this.port}`);
    });
  }
}
