import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { GetController } from '../../source/Controllers/GetController';
import { ValidRoutes } from '../ValidRoutes';

export class GetRouter extends RequestRouter {
  constructor() {
    super(GetController);
  }

  initializeRoutes() {
    this.router.get('/helloworld', (req, res) => {
      this.handleRequest(ValidRoutes.HelloWorld, req, res);
    });
  }
}
