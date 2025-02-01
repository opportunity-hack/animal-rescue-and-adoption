import { Behavior } from '../Models/Behavior';
import { DBCatchable } from '../../library/Decorators/DBCatchable';
import {
  BehaviorAlreadyExists,
  BehaviorDoesNotExist
} from '../../library/Errors/Behavior';
import { IBehavior } from '../../library/Types/Animal';

export class BehaviorCRUD {
  @DBCatchable('Failed to create behavior')
  public static async createBehavior(behavior: string): Promise<IBehavior> {
    return await Behavior.create({ name: behavior.toLowerCase() });
  }

  @DBCatchable('Failed to fetch all')
  public static async getBehaviors(): Promise<IBehavior[]> {
    return await Behavior.find();
  }

  @DBCatchable('Failed to fetch behavior')
  public static async getBehaviorById(id: string): Promise<IBehavior> {
    const behavior = await Behavior.findById(id);

    if (!behavior) {
      throw new BehaviorDoesNotExist('Behavior does not exist');
    }

    return behavior;
  }

  @DBCatchable('Failed to update behavior')
  public static async findBehaviorByName(name: string): Promise<IBehavior> {
    const behavior = await Behavior.findOne({ name: name.toLowerCase() });

    if (!behavior) {
      throw new BehaviorDoesNotExist('Behavior does not exist');
    }

    return behavior;
  }

  public static async behaviorExists(name: string): Promise<void> {
    const behavior = await Behavior.exists({ name: name.toLowerCase() });

    if (behavior) {
      throw new BehaviorAlreadyExists('Behavior already exists');
    }
  }
}
