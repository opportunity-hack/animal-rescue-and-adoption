import { HttpStatusCode } from 'axios';
import { BaseError, ErrorResponse } from '../Interfaces/Errors';

// Errors
export class CouldNotSendEmail extends BaseError {}
export class CouldNotSaveImage extends BaseError {}

// Response
export class CouldNotSendEmailRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.InternalServerError;
    this.title = 'Send Email Error';
    this.message = {
      error: 'Error occurred while sending email'
    };
  }
}

export class CouldNotSaveImageRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.InternalServerError;
    this.title = 'Save Image Error';
    this.message = {
      error: 'Error occurred while saving image'
    };
  }
}
