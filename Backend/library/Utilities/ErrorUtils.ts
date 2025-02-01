import { HttpStatusCode } from 'axios';
import {
  DBConnectionFailure,
  DBConnectionFailureRes,
  DBError,
  DBErrorRes
} from '../Errors/Database';
import { CouldNotSendEmail, CouldNotSendEmailRes } from '../Errors/Email';
import {
  MissingBody,
  MissingBodyRes,
  MissingHeaders,
  MissingHeadersRes
} from '../Errors/Params';
import { ErrorResponse } from '../Interfaces/Errors';
import { LoggerUtils } from './LoggerUtils';

export type CustomErrorType = new (...args: any[]) => Error;

class GenericErrorResponse extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.InternalServerError;
    this.title = 'Internal Server Error';
    this.message = {
      error: 'An error occurred while processing the request'
    };
  }
}

export class ErrorUtils {
  private static errorResMap = new Map<string, (error: any) => ErrorResponse>([
    [DBConnectionFailure.name, () => new DBConnectionFailureRes()],
    [DBError.name, () => new DBErrorRes()],
    [CouldNotSendEmail.name, () => new CouldNotSendEmailRes()],
    [
      MissingHeaders.name,
      (error: MissingHeaders) => new MissingHeadersRes(error.missingHeaders)
    ],
    [
      MissingBody.name,
      (error: MissingBody) => new MissingBodyRes(error.missingBody)
    ]
  ]);

  public static getErrorRes(
    error: unknown,
    showError?: boolean
  ): ErrorResponse {
    LoggerUtils.error(
      `${(error as Error).name} ` + `${(error as Error).message}`
    );

    if (showError) {
      LoggerUtils.error(error);
    }

    const errorName = error instanceof Error ? error.name : '';
    const errorRes =
      this.errorResMap.get(errorName)?.(error) ?? new GenericErrorResponse();

    return errorRes;
  }

  public static throwCustomError<T extends CustomErrorType>(
    error: unknown,
    message: string,
    CustomError: T
  ): never {
    LoggerUtils.error(error);

    if (error instanceof Error) {
      throw new CustomError(`${message}: ${error.message}`);
    } else {
      throw new CustomError(message);
    }
  }
}
