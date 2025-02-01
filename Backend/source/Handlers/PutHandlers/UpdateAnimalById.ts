import { HttpStatusCode } from 'axios';
import { AnimalCRUD } from '../../../database/Services/AnimalCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import { InvalidAnimalUpdateData } from '../../../library/Errors/Animal';
import { MissingHeaders } from '../../../library/Errors/Params';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { UpdateableAnimalKeys } from '../../../library/Types/Animal';
import { AnimalValidator } from '../../../library/Validators/Animal';

@Checkable
export class UpdateAnimalById
  extends Handler<ServerEvent>
  implements IHasChecks
{
  private declare updateData: UpdateableAnimalKeys;
  private declare animalId: string;

  constructor(event: ServerEvent) {
    super(event);

    console.log(`I'm here`);
  }

  private checkIdInHeaders(): void {
    if (!this.event.req.headers.id) {
      throw new MissingHeaders(`Invalid animal id`, ['id']);
    }
    this.animalId = this.event.req.headers.id as string;
  }

  private checkData(): void {
    const data = AnimalValidator.UpdateableAnimalKeys.safeParse(
      this.event.req.body
    );

    if (data.success) {
      this.updateData = data.data as UpdateableAnimalKeys;
    } else {
      throw new InvalidAnimalUpdateData(`Invalid animal data`);
    }
  }

  @Catchable()
  async runChecks(): Promise<void> {
    this.checkIdInHeaders();
    this.checkData();

    await new Promise((resolve) => {
      resolve(void 0);
    });
  }

  @Catchable()
  async execute(): Promise<void> {
    const animal = await AnimalCRUD.updateAnimalById(
      this.animalId,
      this.updateData
    );

    this.event.res.status(HttpStatusCode.Ok).json(animal);
  }
}
