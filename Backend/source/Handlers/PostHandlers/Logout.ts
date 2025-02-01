import { Globals } from '../../../library/Globals/Globals';
import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { HttpStatusCode } from 'axios';

export class Logout extends Handler<ServerEvent> {
  constructor(event: ServerEvent) {
    super(event);
  }

  @Catchable()
  async execute(): Promise<void> {
    this.event.res.clearCookie('token', {
      httpOnly: true,
      secure: Globals.IS_PRODUCTION,
      sameSite: Globals.IS_PRODUCTION ? 'none' : 'lax'
    });

    this.event.res
      .status(HttpStatusCode.Ok)
      .json({ message: 'Logged out successfully' });

    await new Promise((resolve) => {
      resolve(void 0);
    });
  }
}
