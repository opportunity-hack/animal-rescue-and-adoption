import { UserCRUD } from '../../../database/Services/UserCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { HttpStatusCode } from 'axios';

export class AddAdminUser extends Handler<ServerEvent> {
  constructor(event: ServerEvent) {
    super(event);
  }

  @Catchable()
  async execute(): Promise<void> {
    const { email } = this.event.req.body as { email: string };
    const user = await UserCRUD.addAdminUser(email);

    this.event.res.status(HttpStatusCode.Ok).json(user);
  }
}
