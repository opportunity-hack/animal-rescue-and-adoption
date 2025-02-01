import {
  Controller,
  HandlerController,
  ServerEvent
} from '../../library/Interfaces/HandlerController';
import { ValidRoutes } from '../../server/ValidRoutes';
import { UpdateAnimalById } from '../Handlers/PutHandlers/UpdateAnimalById';

export class PutController extends Controller<ServerEvent> {
  private routeId: ValidRoutes;

  constructor(event: ServerEvent) {
    super(event);
    this.routeId = event.route;
  }

  protected resolve(): HandlerController<ServerEvent> | null {
    switch (this.routeId) {
      case ValidRoutes.UpdateAnimalById:
        return new UpdateAnimalById(this.trigger);
      default:
        return null;
    }
  }
}
