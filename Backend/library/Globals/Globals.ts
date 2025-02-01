import dotenv from 'dotenv';

export class Globals {
  public static ENV = process.env.NODE_ENV || 'development';

  private constructor() {}

  static {
    Globals.initialize();
  }

  private static initialize() {
    dotenv.config({ path: `.env.${Globals.ENV}` });
  }
  // CONSTANTS

  // PRIVATE CONSTANTS | VARIABLES
  public static readonly DB_NAME = process.env.DB_NAME || '';
  public static readonly MONGO_URI = process.env.MONGODB_URI || '';
  public static readonly V_EMAIL = process.env.V_EMAIL || '';
  public static readonly V_PASSWORD = process.env.V_PASSWORD || '';
  public static readonly PORT = process.env.PORT || 3000;

  // VARIABLE ACCESSORS BASED ON ENVIRONMENT
}
