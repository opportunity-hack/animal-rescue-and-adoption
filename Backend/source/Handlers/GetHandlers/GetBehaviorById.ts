import { HttpStatusCode } from 'axios';
import { BehaviorCRUD } from '../../../database/Services/BehaviorCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import { MissingBody } from '../../../library/Errors/Params';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';

@Checkable
export class GetBehaviorById
  extends Handler<ServerEvent>
  implements IHasChecks
{
  private declare id: string;

  constructor(event: ServerEvent) {
    super(event);
  }

  private checkBehaviorId(): void {
    const headers = this.event.req.headers as { id: string };

    if (!headers.id) {
      throw new MissingBody('Missing behaviorId', ['id']);
    }

    this.id = headers.id;
  }

  @Catchable()
  async runChecks(): Promise<void> {
    this.checkBehaviorId();

    await new Promise((resolve) => {
      resolve(void 0);
    });
  }

  @Catchable()
  async execute(): Promise<void> {
    const behavior = await BehaviorCRUD.getBehaviorById(this.id);

    this.event.res.status(HttpStatusCode.Ok).send(behavior);
  }
}
