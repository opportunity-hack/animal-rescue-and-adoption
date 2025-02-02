import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { PostController } from '../../source/Controllers/PostController';
import { ValidRoutes } from '../ValidRoutes';

export class PostRouter extends RequestRouter {
  constructor() {
    super(PostController);
  }

  initializeRoutes() {
    this.router.post('/google-auth', (req, res) => {
      this.handleRequest(ValidRoutes.GoogleAuth, req, res, false);
    });

    this.router.post('/logout', (req, res) => {
      this.handleRequest(ValidRoutes.Logout, req, res, true);
    });

    this.router.post('/todo', (req, res) => {
      this.handleRequest(ValidRoutes.Todo, req, res, true);
    });

    this.router.post('/add/admin', (req, res) => {
      this.handleRequest(ValidRoutes.AddAdminUser, req, res, true);
    });

    this.router.post('/add/volunteer', (req, res) => {
      this.handleRequest(ValidRoutes.AddVolunteerUser, req, res, true);
    });

    this.router.post('/webhooks/jotform/checkin', (req, res) => {
      this.handleRequest(ValidRoutes.JotformCheckin, req, res, false);
    });

    this.router.post('/post/animal', (req, res) => {
      this.handleRequest(ValidRoutes.CreateAnimal, req, res, false);
    });

    this.router.post('/post/behavior', (req, res) => {
      this.handleRequest(ValidRoutes.CreateBehavior, req, res, true);
    });
  }
}
