import { RequestRouter } from '../../library/Interfaces/RequestRouter';
import { GetController } from '../../source/Controllers/GetController';
import { ValidRoutes } from '../ValidRoutes';

export class GetRouter extends RequestRouter {
  constructor() {
    super(GetController);
  }

  initializeRoutes() {
    this.router.get('/check-auth', (req, res) => {
      this.handleRequest(ValidRoutes.CheckAuth, req, res, false);
    });
    this.router.get('/get-todo', (req, res) => {
      this.handleRequest(ValidRoutes.GetToDo, req, res, true);
    });
    this.router.get('/get-admin-users', (req, res) => {
      this.handleRequest(ValidRoutes.GetAdminUsers, req, res, true);
    });

    this.router.get('/get-volunteer-users', (req, res) => {
      this.handleRequest(ValidRoutes.GetVolunteerUsers, req, res, true);
    });

    this.router.get('/get/animal', (req, res) => {
      this.handleRequest(ValidRoutes.GetAnimalById, req, res, false);
    });

    this.router.get('/get/animals', (req, res) => {
      this.handleRequest(ValidRoutes.GetAllAnimals, req, res, false);
    });

    this.router.get('/get/behavior/id', (req, res) => {
      this.handleRequest(ValidRoutes.GetBehaviorById, req, res, false);
    });

    this.router.get('/get/behavior/name', (req, res) => {
      this.handleRequest(ValidRoutes.GetBehaviorByName, req, res, false);
    });

    this.router.get('/get/behaviors', (req, res) => {
      this.handleRequest(ValidRoutes.GetBehaviors, req, res, false);
    });
  }
}
