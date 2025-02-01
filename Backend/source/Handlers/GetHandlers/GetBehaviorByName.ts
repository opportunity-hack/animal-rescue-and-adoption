import { HttpStatusCode } from 'axios';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import { MissingBody } from '../../../library/Errors/Params';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { BehaviorCRUD } from '../../../database/Services/BehaviorCRUD';

@Checkable
export class GetBehaviorByName
  extends Handler<ServerEvent>
  implements IHasChecks
{
  private declare name: string;

  constructor(event: ServerEvent) {
    super(event);
  }

  private checkBehaviorName(): void {
    const body = this.event.req.body as { name: string };

    if (!body.name) {
      throw new MissingBody('Missing name', ['name']);
    }

    this.name = body.name;
  }

  @Catchable()
  async runChecks(): Promise<void> {
    this.checkBehaviorName();

    await new Promise((resolve) => {
      resolve(void 0);
    });
  }

  @Catchable()
  async execute(): Promise<void> {
    const behavior = await BehaviorCRUD.findBehaviorByName(this.name);

    this.event.res.status(HttpStatusCode.Ok).send(behavior);
  }
}
