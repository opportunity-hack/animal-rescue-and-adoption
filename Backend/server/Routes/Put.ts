import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { PutController } from '../../source/Controllers/PutController';

export class PutRouter extends RequestRouter {
  constructor() {
    super(PutController);
  }

  initializeRoutes() {}
}
