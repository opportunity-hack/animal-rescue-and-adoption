import { HttpStatusCode } from 'axios';
import { UserCRUD } from '../../../database/Services/UserCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { MissingBody } from '../../../library/Errors/Params';

export class RemoveVolunteerUser extends Handler<ServerEvent> {
  constructor(event: ServerEvent) {
    super(event);
  }

  @Catchable()
  async execute(): Promise<void> {
    const { email } = this.event.req.body;

    if (!email && typeof email !== 'string') {
      throw new MissingBody('Invalid email provided', ['email']);
    }

    const user = await UserCRUD.removeVolunteerUser(email);

    this.event.res.status(HttpStatusCode.Ok).json(user);
  }
}
