import { z } from "zod";
import { AnimalSex, AnimalStatus } from "../interfaces/Animal";

export class AnimalValidator {
  public static Behavior = z.object({
    _id: z.string(),
    name: z.string(),
  });

  public static NewBehavior = this.Behavior.pick({
    name: true,
  });

  public static BaseAnimal = z.object({
    _id: z.string(),
    intakeDate: z.number(),
  });

  public static AnimalData = z
    .object({
      name: z.string(),
      species: z.string(),
      sex: z.nativeEnum(AnimalSex),
      status: z.nativeEnum(AnimalStatus),
      images: z.array(z.string().url()),
      behaviors: z.array(AnimalValidator.Behavior),
      age: z.number().optional(),
      breed: z.string().optional(),
      medicalInfo: z.string().optional(),
      location: z.string().optional(),
      notes: z.string().optional(),
      weight: z.number().optional(),
    })
    .merge(AnimalValidator.BaseAnimal);

  public static UpdateableAnimalKeysAsString = Object.keys(
    this.AnimalData.omit({
      _id: true,
      intakeDate: true,
    }).shape
  );

  public static UpdateableAnimalKeys = AnimalValidator.AnimalData.omit({
    _id: true,
    intakeDate: true,
  })
    .partial()
    .refine(
      (data) => Object.values(data).some((value) => value !== undefined),
      {
        message: "At least one updateable key must be provided",
      }
    );

  public static NewAnimalData = z.object({
    name: z.string(),
    species: z.string(),
    sex: z.nativeEnum(AnimalSex),
    images: z.array(z.string().url()),
  });
}
