import { Animal } from '../Models/Animal';
import { DBCatchable } from '../../library/Decorators/DBCatchable';
import {
  AnimalDoesNotExist,
  NoAnimalsFound
} from '../../library/Errors/Animal';
import {
  NewAnimalData,
  IAnimalData,
  AnimalStatus,
  UpdateableAnimalKeys
} from '../../library/Types/Animal';

export class AnimalCRUD {
  // POST
  @DBCatchable('Failed to create animal')
  public static async createAnimal(
    newAnimalData: NewAnimalData
  ): Promise<IAnimalData> {
    const animalData: NewAnimalData & { status: AnimalStatus } = {
      ...newAnimalData,
      status: AnimalStatus.REHABILITATED
    };

    const animal = await Animal.create(animalData);
    return animal;
  }

  // GET
  @DBCatchable('Failed to fetch animal')
  public static async getAnimalById(id: string): Promise<IAnimalData> {
    const animal = await Animal.findById(id).populate('behaviors');

    if (!animal) {
      throw new AnimalDoesNotExist(`Animal with ID ${id} does not exist`);
    }

    return animal;
  }

  // GET
  @DBCatchable('Failed to fetch all animals')
  public static async getAllAnimals(): Promise<IAnimalData[]> {
    const animals = await Animal.find().populate('behaviors');

    if (animals.length === 0) {
      throw new NoAnimalsFound('There are no animals in the database');
    }

    animals.map((animal) => {
      animal.behaviors?.map((behavior) => behavior.name);
    });

    return animals;
  }

  // PUT
  @DBCatchable('Failed to update animal')
  public static async updateAnimalById(
    id: string,
    updatedAnimalData: UpdateableAnimalKeys
  ): Promise<IAnimalData> {
    const animal = await Animal.findByIdAndUpdate(id, updatedAnimalData, {
      new: true
    });

    if (!animal) {
      throw new AnimalDoesNotExist(`Animal with ID ${id} does not exist`);
    }

    return animal;
  }
}
