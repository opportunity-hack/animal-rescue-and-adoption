import { HttpStatusCode } from 'axios';
import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { UserCRUD } from '../../../database/Services/UserCRUD';

export class GetAdminUsers extends Handler<ServerEvent> {
  constructor(event: ServerEvent) {
    super(event);
  }

  @Catchable()
  async execute(): Promise<void> {
    const adminUsers = await UserCRUD.getAdminUsers();

    this.event.res.status(HttpStatusCode.Ok).json(adminUsers);
  }
}
