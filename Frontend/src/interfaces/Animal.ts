import { z } from "zod";
import { AtLeastOne } from "./Generic";
import { AnimalValidator } from "../Validators/Animal";

export enum AnimalSex {
  MALE = "male",
  FEMALE = "female",
  UNKNOWN = "unknown",
}

export enum AnimalStatus {
  ADOPTED = "adopted",
  IN_REHABILITATION = "in-rehabilitation",
  REHABILITATED = "rehabilitated",
  RELEASED = "released",
  NO_STATUS = "no-status",
}

/*
export interface IBehavior extends z.infer<typeof AnimalValidator.Behavior> {}

export interface IBaseAnimal
  extends z.infer<typeof AnimalValidator.BaseAnimal> {}
*/
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IAnimalData
  extends z.infer<typeof AnimalValidator.AnimalData> {}

export type NewAnimalData = z.infer<typeof AnimalValidator.NewAnimalData>;

export type UpdateableAnimalKeys = AtLeastOne<
  Required<z.infer<typeof AnimalValidator.UpdateableAnimalKeys>>
>;
