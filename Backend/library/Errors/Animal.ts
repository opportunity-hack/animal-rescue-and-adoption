import { HttpStatusCode } from 'axios';
import { BaseError, ErrorResponse } from '../Interfaces/Errors';
import { AnimalValidator } from '../Validators/Animal';

export class AnimalDoesNotExist extends BaseError {}
export class NoAnimalsFound extends BaseError {}
export class InvalidAnimalData extends BaseError {}
export class InvalidAnimalUpdateData extends BaseError {}

export class AnimalDoesNotExistRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.BadRequest;
    this.title = 'Animal Not Found';
    this.message = {
      error: 'Animal does not exist'
    };
  }
}

export class NoAnimalsFoundRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.BadRequest;
    this.title = 'No Animals Found';
    this.message = {
      error: 'No animals found'
    };
  }
}

export class InvalidAnimalDataRes extends ErrorResponse {
  constructor() {
    super();

    this.code = HttpStatusCode.BadRequest;
    this.title = 'Invalid Animal Data';
    this.message = {
      message: 'Invalid animal data. Check below for required body parameters',
      error: {
        name: 'string',
        species: 'string',
        sex: 'male, female, or unknown',
        images: ['string']
      }
    };
  }
}

export class InvalidAnimalUpdateDataRes extends ErrorResponse {
  constructor() {
    super();

    const keys = AnimalValidator.UpdateableAnimalKeysAsString;

    this.code = HttpStatusCode.BadRequest;
    this.title = 'Invalid Animal Update Data';
    this.message = {
      message:
        'Invalid animal update data. Have atleast one of the following keys in the body',
      keys
    };
  }
}
