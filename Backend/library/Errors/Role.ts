import { HttpStatusCode } from 'axios';
import { BaseError, ErrorResponse } from '../Interfaces/Errors';

export class RoleNotFound extends BaseError {}

export class RoleNotFoundRes extends ErrorResponse {
  constructor() {
    super();
    this.code = HttpStatusCode.BadRequest;
    this.title = 'Could not find role';
    this.message = { error: 'Role not found' };
  }
}
