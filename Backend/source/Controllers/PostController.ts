import {
  Controller,
  HandlerController,
  ServerEvent
} from '../../library/Interfaces/HandlerController';
import { ValidRoutes } from '../../server/ValidRoutes';
import { AddAdminUser } from '../Handlers/PostHandlers/AddAdminUser';
import { GoogleAuth } from '../Handlers/PostHandlers/GoogleAuth';
import { Logout } from '../Handlers/PostHandlers/Logout';
import { ToDo } from '../Handlers/PostHandlers/Todo';
import { CreateAnimal } from '../Handlers/PostHandlers/CreateAnimal';
import { CreateBehavior } from '../Handlers/PostHandlers/CreateBehavior';
import { Jotform } from '../Handlers/PostHandlers/Jotform';
import { AddVolunteerUser } from '../Handlers/PostHandlers/AddVolunteerUser';

export class PostController extends Controller<ServerEvent> {
  private routeId: ValidRoutes;

  constructor(event: ServerEvent) {
    super(event);
    this.routeId = event.route;
  }

  protected resolve(): HandlerController<ServerEvent> | null {
    switch (this.routeId) {
      case ValidRoutes.GoogleAuth:
        return new GoogleAuth(this.trigger);
      case ValidRoutes.Logout:
        return new Logout(this.trigger);
      case ValidRoutes.Todo:
        return new ToDo(this.trigger);
      case ValidRoutes.AddAdminUser:
        return new AddAdminUser(this.trigger);
      case ValidRoutes.AddVolunteerUser:
        return new AddVolunteerUser(this.trigger);
      case ValidRoutes.CreateAnimal:
        return new CreateAnimal(this.trigger);
      case ValidRoutes.CreateBehavior:
        return new CreateBehavior(this.trigger);
      case ValidRoutes.JotformCheckin:
        return new Jotform(this.trigger);
      default:
        return null;
    }
  }
}
