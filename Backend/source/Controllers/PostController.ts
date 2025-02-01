import {
  Controller,
  HandlerController,
  ServerEvent
} from '../../library/Interfaces/HandlerController';
import { ValidRoutes } from '../../server/ValidRoutes';

export class PostController extends Controller<ServerEvent> {
  private routeId: ValidRoutes;

  constructor(event: ServerEvent) {
    super(event);
    this.routeId = event.route;
  }

  protected resolve(): HandlerController<ServerEvent> | null {
    switch (this.routeId) {
      default:
        return null;
    }
  }
}
