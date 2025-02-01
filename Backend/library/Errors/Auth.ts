import { HttpStatusCode } from 'axios';
import { BaseError, ErrorResponse } from '../Interfaces/Errors';

// Auth errors will always throw HttpStatusCode.Unauthorized

// Errors
export class Unauthorized extends BaseError {}
export class InvalidCredentials extends BaseError {}
export class MissingCookies extends BaseError {}
export class MissingToken extends BaseError {}
export class MissingUser extends BaseError {}
export class UserNotFound extends BaseError {}
export class MissingPayload extends BaseError {}

// Response
export class UnauthorizedRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.Unauthorized;
    this.title = 'Unauthorized';
    this.message = {
      error: 'Unauthorized'
    };
  }
}

export class InvalidCredentialsRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.Unauthorized;
    this.title = 'Credential Error';
    this.message = {
      error: 'Missing or invalid credentials'
    };
  }
}

export class MissingCookiesRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.Unauthorized;
    this.title = 'Missing Cookies';
    this.message = {
      error: 'No cookies provided'
    };
  }
}

export class MissingTokenRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.Unauthorized;
    this.title = 'Missing Token';
    this.message = {
      error: 'Missing authentication token'
    };
  }
}

export class MissingUserRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.Unauthorized;
    this.title = 'User Not Found';
    this.message = {
      error: 'User not found'
    };
  }
}

export class UserNotFoundRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.Unauthorized;
    this.title = 'User Not Found';
    this.message = {
      error: 'User not found'
    };
  }
}

export class MissingPayloadRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.Unauthorized;
    this.title = 'Missing Payload';
    this.message = {
      error: 'No payload provided'
    };
  }
}
