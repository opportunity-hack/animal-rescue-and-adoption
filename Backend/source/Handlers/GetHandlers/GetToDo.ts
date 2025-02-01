import { HttpStatusCode } from 'axios';
import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { ToDoCRUD } from '../../../database/Services/ToDoCRUD';

export class GetToDo extends Handler<ServerEvent> {
  constructor(event: ServerEvent) {
    super(event);
  }

  @Catchable()
  async execute(): Promise<void> {
    const userId = (this.event.req as any).user.existingUser._id as string;
    const todos = await ToDoCRUD.getUserTodos(userId);

    this.event.res.status(HttpStatusCode.Ok).json(todos);
  }
}
