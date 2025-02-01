import { HttpStatusCode } from 'axios';
import { BehaviorCRUD } from '../../../database/Services/BehaviorCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import { InvalidBehaviorData } from '../../../library/Errors/Behavior';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { AnimalValidator } from '../../../library/Validators/Animal';

@Checkable
export class CreateBehavior extends Handler<ServerEvent> implements IHasChecks {
  private declare newBehaviorData: string;

  constructor(event: ServerEvent) {
    super(event);
  }

  private checkData(): void {
    const data = AnimalValidator.NewBehavior.safeParse(this.event.req.body);

    if (data.success && 'name' in data.data) {
      this.newBehaviorData = data.data.name;
    } else {
      throw new InvalidBehaviorData(`Invalid behavior data`);
    }
  }

  private async checkExists(): Promise<void> {
    await BehaviorCRUD.behaviorExists(this.newBehaviorData);
  }

  @Catchable()
  async runChecks(): Promise<void> {
    this.checkData();
    await this.checkExists();
  }

  @Catchable()
  async execute(): Promise<void> {
    const behavior = await BehaviorCRUD.createBehavior(this.newBehaviorData);

    this.event.res.status(HttpStatusCode.Created).json(behavior);
  }
}
