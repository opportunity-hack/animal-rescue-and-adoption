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
  public static readonly PORT = process.env.PORT || 3000;
  public static readonly VITE_G_API_URL = process.env.VITE_G_API_URL || '';
  public static readonly FRONTEND_URL = process.env.FRONTEND_URL || '';
  public static readonly JWT_SECRET = process.env.JWT_SECRET || '';
  public static readonly V_EMAIL = process.env.V_EMAIL || '';
  public static readonly V_PASSWORD = process.env.V_PASSWORD || '';
  public static readonly AWS_ACCESS_KEY_ID =
    process.env.AWS_ACCESS_KEY_ID || '';
  public static readonly AWS_SECRET_ACCESS_KEY =
    process.env.AWS_SECRET_ACCESS_KEY || '';
  public static readonly AWS_REGION = process.env.AWS_REGION || '';
  public static readonly S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || '';

  // VARIABLE ACCESSORS BASED ON ENVIRONMENT
  public static readonly IS_PRODUCTION = Globals.ENV === 'production';
}
