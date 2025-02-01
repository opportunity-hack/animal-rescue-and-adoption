import { ErrorResponse } from '../Interfaces/Errors';
import { Handler, ServerEvent } from '../Interfaces/HandlerController';
import { ErrorUtils } from '../Utilities/ErrorUtils';

export function Catchable(log?: boolean) {
  return function (
    _target: Handler<ServerEvent>,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<void>>
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      this: Handler<ServerEvent>,
      ...args: any[]
    ): Promise<void> {
      const res = this.event.res;

      if (!originalMethod) {
        throw new Error('Method not found');
      }

      try {
        await originalMethod.apply(this, args);
      } catch (error) {
        this.errored = true;
        if (log) {
          console.error(error);
        }

        const errorRes: ErrorResponse = ErrorUtils.getErrorRes(error, log);

        res.status(errorRes.code).send(errorRes.message);
      }
    };
  };
}
