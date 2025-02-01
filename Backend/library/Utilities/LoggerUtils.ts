import { createLogger, format, Logger, transports } from 'winston';
import { Globals } from '../Globals/Globals';
export class LoggerUtils {
  private static logger: Logger;

  static {
    this.initialize();
  }

  private static initialize() {
    const customization = [
      format.colorize({ level: true }),
      format.timestamp({ format: 'D MMM, h:m:s a' }),
      format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      })
    ];

    function createTransport(label: string) {
      return new transports.Console({
        format: format.combine(format.label({ label }), ...customization)
      });
    }

    if (Globals.ENV === 'production') {
      this.logger = createLogger({
        transports: [createTransport('Prod')]
      });
    } else {
      this.logger = createLogger({
        transports: [
          new transports.File({
            filename: 'Logs/testing.log',
            format: format.json({ space: 2 })
          }),
          createTransport('Dev')
        ]
      });
    }
  }

  public static error(...args: any[]) {
    this.logger.error(args);
  }

  public static warn(...args: any[]) {
    this.logger.warn(args);
  }

  public static info(...args: any[]) {
    this.logger.info(args);
  }

  public static http(...args: any[]) {
    this.logger.http(args);
  }

  public static verbose(...args: any[]) {
    this.logger.verbose(args);
  }

  public static debug(...args: any[]) {
    this.logger.debug(args);
  }

  public static silly(...args: any[]) {
    this.logger.silly(args);
  }
}
