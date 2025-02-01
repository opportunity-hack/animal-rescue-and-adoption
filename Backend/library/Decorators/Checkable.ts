import {
  Handler,
  IHandler,
  ServerEvent
} from '../Interfaces/HandlerController';

export function Checkable<
  T extends {
    new (...args: any[]): Handler<ServerEvent> & IHandler;
  }
>(constructor: T): T {
  return class extends constructor implements Handler<ServerEvent>, IHandler {
    constructor(...args: any[]) {
      super(...(args as ConstructorParameters<T>));
      this.checkable = true;
    }
  };
}
