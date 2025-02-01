import { HttpStatusCode } from 'axios';

export abstract class CustomError extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = new.target.name;
  }
}

export class BaseError extends CustomError {
  constructor(public message: string) {
    super(message);
  }
}

export abstract class ErrorResponse {
  private declare _code: HttpStatusCode;
  private declare _title: string;
  private declare _message: Record<string, any>;

  constructor() {}

  // Setter for code
  set code(value: HttpStatusCode) {
    this._code = value;
  }

  // Getter for code
  get code(): number {
    return this._code;
  }

  // Setter for title
  set title(value: string) {
    this._title = value;
  }

  // Getter for title
  get title(): string {
    return this._title;
  }

  // Setter for message (accepts any JSON with any keys)
  set message(value: { [key: string]: any }) {
    this._message = value;
  }

  // Getter for message
  get message(): { [key: string]: any } {
    return this._message;
  }
}
