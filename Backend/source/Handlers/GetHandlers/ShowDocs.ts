import { HttpStatusCode } from 'axios';
import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import * as fs from 'fs';
import * as path from 'path';

export class ShowDocs extends Handler<ServerEvent> {
  constructor(event: ServerEvent) {
    super(event);
  }

  @Catchable()
  async execute(): Promise<void> {
    const filePath = path.join(__dirname, '../../../docs/index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        this.event.res
          .status(HttpStatusCode.InternalServerError)
          .send('Error reading file');
        return;
      }
      this.event.res.status(HttpStatusCode.Ok).send(data);
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });
  }
}
