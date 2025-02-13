import { HttpStatusCode } from 'axios';
import {
  DBConnectionFailure,
  DBConnectionFailureRes,
  DBError,
  DBErrorRes
} from '../Errors/Database';
import {
  CouldNotSaveImage,
  CouldNotSaveImageRes,
  CouldNotSendEmail,
  CouldNotSendEmailRes
} from '../Errors/External';
import {
  MissingBody,
  MissingBodyRes,
  MissingHeaders,
  MissingHeadersRes
} from '../Errors/Params';
import { ErrorResponse } from '../Interfaces/Errors';
import { LoggerUtils } from './LoggerUtils';
import {
  InvalidCredentials,
  InvalidCredentialsRes
} from '../Errors/GoogleAuth';
import {
  AnimalDoesNotExist,
  AnimalDoesNotExistRes,
  InvalidAnimalData,
  InvalidAnimalDataRes,
  InvalidAnimalUpdateData,
  InvalidAnimalUpdateDataRes,
  NoAnimalsFound,
  NoAnimalsFoundRes
} from '../Errors/Animal';
import {
  BehaviorAlreadyExists,
  BehaviorAlreadyExistsRes,
  BehaviorDoesNotExist,
  BehaviorDoesNotExistRes,
  InvalidBehaviorData,
  InvalidBehaviorDataRes,
  NoBehaviorsSaved,
  NoBehaviorsSavedRes
} from '../Errors/Behavior';
import {
  MissingCookies,
  MissingCookiesRes,
  MissingPayload,
  MissingPayloadRes,
  MissingToken,
  MissingTokenRes,
  MissingUser,
  MissingUserRes,
  Unauthorized,
  UnauthorizedRes,
  UserNotFound,
  UserNotFoundRes
} from '../Errors/Auth';

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
    ],
    [InvalidCredentials.name, () => new InvalidCredentialsRes()],
    [Unauthorized.name, () => new UnauthorizedRes()],
    [AnimalDoesNotExist.name, () => new AnimalDoesNotExistRes()],
    [NoAnimalsFound.name, () => new NoAnimalsFoundRes()],
    [NoBehaviorsSaved.name, () => new NoBehaviorsSavedRes()],
    [BehaviorAlreadyExists.name, () => new BehaviorAlreadyExistsRes()],
    [MissingCookies.name, () => new MissingCookiesRes()],
    [MissingToken.name, () => new MissingTokenRes()],
    [MissingUser.name, () => new MissingUserRes()],
    [UserNotFound.name, () => new UserNotFoundRes()],
    [MissingPayload.name, () => new MissingPayloadRes()],
    [BehaviorDoesNotExist.name, () => new BehaviorDoesNotExistRes()],
    [CouldNotSaveImage.name, () => new CouldNotSaveImageRes()],
    [InvalidAnimalData.name, () => new InvalidAnimalDataRes()],
    [InvalidBehaviorData.name, () => new InvalidBehaviorDataRes()],
    [InvalidAnimalUpdateData.name, () => new InvalidAnimalUpdateDataRes()]
  ]);

  public static getErrorRes(
    error: unknown,
    showError?: boolean
  ): ErrorResponse {
    LoggerUtils.error(
      `${(error as Error).name} ` + `${(error as Error).message}`
    );

    if (showError) {
      console.error(error);
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
