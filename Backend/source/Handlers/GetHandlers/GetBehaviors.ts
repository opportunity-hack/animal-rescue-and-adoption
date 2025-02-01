import { HttpStatusCode } from 'axios';
import { BehaviorCRUD } from '../../../database/Services/BehaviorCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';

export class GetAllBehaviors extends Handler<ServerEvent> {
  constructor(event: ServerEvent) {
    super(event);
  }

  @Catchable()
  async execute(): Promise<void> {
    const behaviors = await BehaviorCRUD.getBehaviors();

    this.event.res.status(HttpStatusCode.Ok).send(behaviors);
  }
}
