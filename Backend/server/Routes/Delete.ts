import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { DeleteController } from '../../source/Controllers/DeleteController';
import { ValidRoutes } from '../ValidRoutes';

export class DeleteRouter extends RequestRouter {
  constructor() {
    super(DeleteController);
  }

  initializeRoutes() {
    this.router.delete('/remove/volunteer', (req, res) => {
      this.handleRequest(ValidRoutes.RemoveVolunteerUser, req, res, true);
    });
  }
}
