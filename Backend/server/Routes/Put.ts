import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { PutController } from '../../source/Controllers/PutController';
import { ValidRoutes } from '../ValidRoutes';

export class PutRouter extends RequestRouter {
  constructor() {
    super(PutController);
  }

  initializeRoutes() {
    this.router.put('/put/animal', (req, res) => {
      this.handleRequest(ValidRoutes.UpdateAnimalById, req, res, true);
    });
  }
}
