import { HttpStatusCode } from 'axios';
import { BaseError, ErrorResponse } from '../Interfaces/Errors';

// Errors
export class DBConnectionFailure extends BaseError {}
export class DBError extends BaseError {}

// Responses
export class DBConnectionFailureRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.InternalServerError;
    this.title = 'Database Connection Failure';
    this.message = {
      error: 'Error occurred while connecting to the database'
    };
  }
}

export class DBErrorRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.InternalServerError;
    this.title = 'Database Error';
    this.message = {
      error: 'Error occurred while executing database operation'
    };
  }
}
