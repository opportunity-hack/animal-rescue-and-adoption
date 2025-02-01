import { ErrorUtils } from '../Utilities/ErrorUtils';
import { DBError } from '../Errors/Database';

export function DBCatchable<T>(errorMessage: string) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<T>>
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<T> {
      if (!originalMethod) {
        throw new Error('Method not found');
      }

      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        ErrorUtils.throwCustomError(error, errorMessage, DBError);
      }
    };
  };
}
