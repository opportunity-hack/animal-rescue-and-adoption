import { Request, Response, Router } from 'express';
import { ValidRoutes } from '../../server/ValidRoutes';
import { ControllerChild } from './HandlerController';

export abstract class RequestRouter {
  public router: Router;
  private controller: ControllerChild;

  constructor(controller: ControllerChild) {
    this.router = Router();
    this.initializeRoutes();
    this.controller = controller;
  }

  protected abstract initializeRoutes(): void;

  protected handleRequest(
    route: ValidRoutes,
    req: Request,
    res: Response
  ): void {
    const handler = new this.controller({ route, req, res });

    handler.process().catch(() => {
      // Do nothing
    });
  }
}
