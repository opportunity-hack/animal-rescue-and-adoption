import { HttpStatusCode } from 'axios';
import { CustomError, ErrorResponse } from '../Interfaces/Errors';

export class MissingHeaders extends CustomError {
  missingHeaders: string[];

  constructor(message: string, headers: string[]) {
    super(message);
    this.missingHeaders = headers;
  }

  getMissingHeaders() {
    return this.missingHeaders;
  }
}

export class MissingBody extends CustomError {
  missingBody: string[] | Record<string, string>;

  constructor(message: string, body: string[]) {
    super(message);
    this.missingBody = body;
  }

  getMissingBody() {
    return this.missingBody;
  }
}

export class MissingHeadersRes extends ErrorResponse {
  constructor(headers: string[]) {
    super();
    this.code = HttpStatusCode.BadRequest;
    this.title = 'Missing Headers in Request';
    this.message = { missingHeaders: headers };
  }
}

export class MissingBodyRes extends ErrorResponse {
  constructor(body: string[] | Record<string, string>) {
    super();
    this.code = HttpStatusCode.BadRequest;
    this.title = 'Missing Body in Request';
    this.message = { missingBody: body };
  }
}
