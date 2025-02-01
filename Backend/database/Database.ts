import mongoose from 'mongoose';
import { DBConnectionFailure } from '../library/Errors/Database';
import { Globals } from '../library/Globals/Globals';
import { ErrorUtils } from '../library/Utilities/ErrorUtils';
import { LoggerUtils } from '../library/Utilities/LoggerUtils';

export class Database {
  private readonly uri: string;

  constructor() {
    this.uri = `${Globals.MONGO_URI}`;
  }

  public async connect(): Promise<void> {
    await mongoose
      .connect(this.uri, {
        ...(Globals.ENV === 'production' ? { tls: true } : {}),
        ...(Globals.ENV === 'production' ? { ssl: true } : {}),
        dbName: Globals.DB_NAME
      })
      .then((instance) =>
        LoggerUtils.info('Connected to MongoDB: ' + instance.connection.name)
      )
      .catch((error) => {
        ErrorUtils.throwCustomError(
          error,
          'Could not connect to MongoDB',
          DBConnectionFailure
        );
      });
  }

  public async disconnect(): Promise<void> {
    await mongoose
      .disconnect()
      .then(() => LoggerUtils.info('Disconnected from MongoDB'))
      .catch((error) =>
        LoggerUtils.error('Could not disconnect from MongoDB', error)
      );
  }
}
