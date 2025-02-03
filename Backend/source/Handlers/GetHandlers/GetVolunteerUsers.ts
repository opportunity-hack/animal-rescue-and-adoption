import { HttpStatusCode } from 'axios';
import { UserCRUD } from '../../../database/Services/UserCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';

export class GetVolunteerUsers extends Handler<ServerEvent> {
  constructor(event: ServerEvent) {
    super(event);
  }

  @Catchable()
  async execute(): Promise<void> {
    const volunteerUsers = await UserCRUD.getVolunteerUsers();

    this.event.res.status(HttpStatusCode.Ok).json(volunteerUsers);
  }
}
