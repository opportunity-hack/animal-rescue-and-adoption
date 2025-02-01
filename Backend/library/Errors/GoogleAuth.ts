import { HttpStatusCode } from 'axios';
import { BaseError, ErrorResponse } from '../Interfaces/Errors';

// Errors
export class InvalidCredentials extends BaseError {}

// Response
export class InvalidCredentialsRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.InternalServerError;
    this.title = 'Credential Error';
    this.message = {
      error: 'Error occurred while validating credential'
    };
  }
}
