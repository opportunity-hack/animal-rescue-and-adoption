import { z } from 'zod';
import { AtLeastOne } from './Generic';
import { AnimalValidator } from '../Validators/Animal';

export enum AnimalSex {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown',
}

export enum AnimalStatus {
  REHABILITATED = 'rehabilitated',
  IN_REHABILITATION = 'in-rehabilitation',
  ADOPTED = 'adopted',
  RELEASED = 'released',
  NO_STATUS = 'no-status',
}

export interface IBehavior extends z.infer<typeof AnimalValidator.Behavior> {}

export interface IBaseAnimal
  extends z.infer<typeof AnimalValidator.BaseAnimal> {}

export interface IAnimalData
  extends z.infer<typeof AnimalValidator.AnimalData> {}

export type NewAnimalData = z.infer<typeof AnimalValidator.NewAnimalData>;

export type UpdateableAnimalKeys = AtLeastOne<
  Required<z.infer<typeof AnimalValidator.UpdateableAnimalKeys>>
>;
