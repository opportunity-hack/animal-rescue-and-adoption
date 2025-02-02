import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import multer from 'multer';
import path from 'path';
import { Globals } from '../library/Globals/Globals';
import { LoggerUtils } from '../library/Utilities/LoggerUtils';
import { GetRouter } from './Routes/Get';
import { PostRouter } from './Routes/Post';
import { PutRouter } from './Routes/Put';

export class Server {
  private readonly app: Application;
  private readonly port: number | string;

  constructor() {
    this.app = express();
    this.port = Globals.PORT;

    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(
      cors({
        origin: [Globals.FRONTEND_URL, Globals.VITE_G_API_URL],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
        credentials: true
      })
    );

    this.app.options('*', cors());
    this.app.use(cookieParser());
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    this.app.use('/api', new GetRouter().router);
    this.app.use('/api', upload.any(), new PostRouter().router);
    this.app.use('/api', new PutRouter().router);

    this.app.use(
      '/docs',
      express.static(path.join(__dirname, '../docs'), {
        setHeaders: (res, path) => {
          if (path.endsWith('.html')) {
            res.setHeader('Content-Type', 'text/html');
          } else if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
          } else if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
          }
        }
      })
    );
  }

  public start(): void {
    this.app.listen(Number(this.port), '0.0.0.0', () => {
      LoggerUtils.info(`Server is running on port ${this.port}`);
    });
  }
}
