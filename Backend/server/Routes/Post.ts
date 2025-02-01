import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { PostController } from '../../source/Controllers/PostController';

export class PostRouter extends RequestRouter {
  constructor() {
    super(PostController);
  }

  initializeRoutes() {}
}
