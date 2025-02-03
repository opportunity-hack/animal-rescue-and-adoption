import {
  Controller,
  HandlerController,
  ServerEvent
} from '../../library/Interfaces/HandlerController';
import { ValidRoutes } from '../../server/ValidRoutes';
import { RemoveVolunteerUser } from '../Handlers/DeleteHandlers/RemoveVolunteerUser';

export class DeleteController extends Controller<ServerEvent> {
  private routeId: ValidRoutes;

  constructor(event: ServerEvent) {
    super(event);
    this.routeId = event.route;
  }

  protected resolve(): HandlerController<ServerEvent> | null {
    switch (this.routeId) {
      case ValidRoutes.RemoveVolunteerUser:
        return new RemoveVolunteerUser(this.trigger);
      default:
        return null;
    }
  }
}
