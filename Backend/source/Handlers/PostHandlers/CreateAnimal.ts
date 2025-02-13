import { HttpStatusCode } from 'axios';
import { AnimalCRUD } from '../../../database/Services/AnimalCRUD';
import { Catchable } from '../../../library/Decorators/Catchable';
import { Checkable } from '../../../library/Decorators/Checkable';
import { InvalidAnimalData } from '../../../library/Errors/Animal';
import {
  Handler,
  IHasChecks,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { NewAnimalData } from '../../../library/Types/Animal';
import { AnimalValidator } from '../../../library/Validators/Animal';
import { ImageDB, ImageUploadType } from '../../../source/Middleware/ImageDB';

@Checkable
export class CreateAnimal extends Handler<ServerEvent> implements IHasChecks {
  private declare newAnimalData: NewAnimalData;
  constructor(event: ServerEvent) {
    super(event);
  }

  private checkData(): void {
    const data = AnimalValidator.NewAnimalData.safeParse(this.event.req.body);

    if (data.success) {
      this.newAnimalData = data.data;
    } else {
      throw new InvalidAnimalData(`Invalid animal data`);
    }
  }

  @Catchable()
  async runChecks(): Promise<void> {
    this.checkData();

    await new Promise((resolve) => {
      resolve(void 0);
    });
  }

  @Catchable(true)
  async execute(): Promise<void> {
    const images: ImageUploadType = this.newAnimalData.images.map((image) => {
      return {
        imageUrl: image,
        key: `${this.newAnimalData.name}-${Date.now()}`
      };
    });

    this.newAnimalData.images = await ImageDB.uploadImages(images);

    const animal = await AnimalCRUD.createAnimal(this.newAnimalData);

    this.event.res.status(HttpStatusCode.Created).json(animal);
  }
}
