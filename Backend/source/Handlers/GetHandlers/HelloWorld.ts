import { HttpStatusCode } from 'axios';
import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';

export class GetHelloWorld extends Handler<ServerEvent> {
  constructor(event: ServerEvent) {
    super(event);
  }

  @Catchable()
  async execute(): Promise<void> {
    const helloworld: Record<string, string> = {
      hello: 'world',
      world: 'hello'
    };

    this.event.res.status(HttpStatusCode.Ok).send(helloworld);

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0);
    });
  }
}
