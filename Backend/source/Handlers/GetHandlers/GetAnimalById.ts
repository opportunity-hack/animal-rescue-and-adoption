import { HttpStatusCode } from 'axios';
import { AnimalCRUD } from '../../../database/Services/AnimalCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import { MissingHeaders } from '../../../library/Errors/Params';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';

@Checkable
export class GetAnimalById extends Handler<ServerEvent> implements IHasChecks {
  private declare id: string;

  constructor(event: ServerEvent) {
    super(event);
  }

  private checkAnimalId(): void {
    const header = this.event.req.headers as { id: string };

    if (!header.id) {
      throw new MissingHeaders('Missing id', ['id']);
    }

    this.id = header.id;
  }

  @Catchable()
  async runChecks(): Promise<void> {
    this.checkAnimalId();

    await new Promise((resolve) => {
      resolve(void 0);
    });
  }

  @Catchable()
  async execute(): Promise<void> {
    const animal = await AnimalCRUD.getAnimalById(this.id);

    this.event.res.status(HttpStatusCode.Ok).send(animal);
  }
}
