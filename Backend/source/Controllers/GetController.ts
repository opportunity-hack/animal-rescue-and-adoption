import {
  Controller,
  HandlerController,
  ServerEvent
} from '../../library/Interfaces/HandlerController';
import { ValidRoutes } from '../../server/ValidRoutes';
import { CheckAuth } from '../Handlers/GetHandlers/CheckAuth';
import { GetAdminUsers } from '../Handlers/GetHandlers/GetAdminUsers';
import { GetAllAnimals } from '../Handlers/GetHandlers/GetAllAnimals';
import { GetAnimalById } from '../Handlers/GetHandlers/GetAnimalById';
import { GetBehaviorById } from '../Handlers/GetHandlers/GetBehaviorById';
import { GetBehaviorByName } from '../Handlers/GetHandlers/GetBehaviorByName';
import { GetAllBehaviors } from '../Handlers/GetHandlers/GetBehaviors';
import { GetToDo } from '../Handlers/GetHandlers/GetToDo';
import { GetVolunteerUsers } from '../Handlers/GetHandlers/GetVolunteerUsers';

export class GetController extends Controller<ServerEvent> {
  private routeId: ValidRoutes;

  constructor(event: ServerEvent) {
    super(event);
    this.routeId = event.route;
  }

  protected resolve(): HandlerController<ServerEvent> | null {
    switch (this.routeId) {
      case ValidRoutes.CheckAuth:
        return new CheckAuth(this.trigger);
      case ValidRoutes.GetToDo:
        return new GetToDo(this.trigger);
      case ValidRoutes.GetAdminUsers:
        return new GetAdminUsers(this.trigger);
      case ValidRoutes.GetVolunteerUsers:
        return new GetVolunteerUsers(this.trigger);
      case ValidRoutes.GetAllAnimals:
        return new GetAllAnimals(this.trigger);
      case ValidRoutes.GetAnimalById:
        return new GetAnimalById(this.trigger);
      case ValidRoutes.GetBehaviors:
        return new GetAllBehaviors(this.trigger);
      case ValidRoutes.GetBehaviorById:
        return new GetBehaviorById(this.trigger);
      case ValidRoutes.GetBehaviorByName:
        return new GetBehaviorByName(this.trigger);
      default:
        return null;
    }
  }
}
