import { ErrorResponse } from '../Interfaces/Errors';

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Nullish<T = null> = T extends null
  ? null | undefined
  : T | null | undefined;

export class ServerError extends ErrorResponse {
  constructor() {
    super();

    this.code = super.code;
    this.title = super.title;
    this.message = super.message;
  }
}
