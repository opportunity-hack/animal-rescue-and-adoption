import { Request, Response } from 'express';
import { ValidRoutes } from '../../server/ValidRoutes';

export type ServerEvent = {
  req: Request;
  res: Response;
  route: ValidRoutes;
};

export type ValidEventTypes = ServerEvent;

export interface IHandler {
  execute(): Promise<void>;
}
export interface IHasChecks {
  runChecks(): Promise<void>;
}
export interface IHandlerWithChecks extends IHasChecks, IHandler {}

/**
 * All interactions with the bot defined in ValidEventTypes that have been routed via a Controller must extend Handler so they are automatically processed. Always remember to add \@Catchable above the execute method to catch any errors that may occur.
 * This class implements ICheckable when the decorator Checkable is used on the class.
 * @template T - A type that extends one of the ValidEventTypes. Can add more types to the ValidEventTypes union type if needed.
 */

export abstract class Handler<T extends ServerEvent> implements IHandler {
  protected checkable: boolean = false;
  protected errored: boolean = false;
  protected event: T;

  constructor(event: T) {
    this.event = event;
  }

  abstract execute(): Promise<void>;

  /**
   * If true, the handler has checks to run before executing the handler.
   */
  public hasChecks(): this is IHandlerWithChecks {
    return this.checkable;
  }

  public hasErrors(): boolean {
    return this.errored;
  }
}

/**
 * Recursive controller to call handlers or other controllers.
 * Implement the resolve method to return a handler or controller to be called.
 * @template T - A type that extends one of the ValidEventTypes. Can add more types to the ValidEventTypes union type if needed.
 */
export abstract class Controller<T extends ValidEventTypes> {
  protected trigger: T;

  constructor(event: T) {
    this.trigger = event;
  }

  /**
   * Resolves a handler or controller.
   * Use a switch in this method to return what service to return. Can also return another controller if needed.
   * @returns A handler or controller to be called. Specify the type of the handler or controller if returning multiple types.
   */
  protected abstract resolve(): HandlerController<T> | null;

  /**
   * Processes the resolved handler or controller recursively. If the resolved handler has checks, it will run them before executing the handler.
   * To add checks to a Handler, implement IHasChecks and decorate the class with \@Checkable like so
   * ```
   * @Checkable
   * export class MyHandler extends Handler<ButtonInteraction> implements IHasChecks {}
   * ```
   */
  public async process(): Promise<void> {
    const resolvedHC = this.resolve();

    if (resolvedHC instanceof Handler) {
      if (resolvedHC.hasChecks()) {
        await resolvedHC.runChecks();
      }

      if (!resolvedHC.hasErrors()) {
        await resolvedHC.execute();
      }
    }

    if (resolvedHC instanceof Controller) {
      await resolvedHC.process();
    }
  }
}

export type HandlerController<T extends ValidEventTypes> =
  | Handler<T>
  | Controller<T>;

export type ControllerChild = new (...args: any[]) => Controller<ServerEvent>;
