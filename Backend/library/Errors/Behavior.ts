import { HttpStatusCode } from 'axios';
import { BaseError, ErrorResponse } from '../Interfaces/Errors';

export class NoBehaviorsSaved extends BaseError {}
export class BehaviorAlreadyExists extends BaseError {}
export class BehaviorDoesNotExist extends BaseError {}
export class InvalidBehaviorData extends BaseError {}

export class NoBehaviorsSavedRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.BadRequest;
    this.title = 'No Behaviors Saved';
    this.message = {
      error: 'No behaviors saved'
    };
  }
}

export class BehaviorAlreadyExistsRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.BadRequest;
    this.title = 'Behavior Already Exists';
    this.message = {
      error: 'Behavior already exists'
    };
  }
}

export class BehaviorDoesNotExistRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.BadRequest;
    this.title = 'Behavior Does Not Exist';
    this.message = {
      error: 'Behavior does not exist'
    };
  }
}

export class InvalidBehaviorDataRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.BadRequest;
    this.title = 'Invalid Behavior Data';
    this.message = {
      message:
        'Invalid behavior data. Check below for required body parameters',
      error: {
        name: 'string'
      }
    };
  }
}
