export enum ValidRoutes {
  GoogleAuth = 'google-auth',
  Logout = 'logout',
  CheckAuth = 'check-auth',
  Todo = 'todo',
  GetToDo = 'get-todo',
  GetAdminUsers = 'get-admin-users',
  AddAdminUser = 'add-admin-user',
  GetVolunteerUsers = 'get-volunteer-users',
  AddVolunteerUser = 'add-volunteer-user',
  RemoveVolunteerUser = 'remove-volunteer-user',

  JotformCheckin = 'jotform-checkin', // POST WEBHOOK for listening for form submissions

  CreateAnimal = 'post-animal', // POST
  GetAnimalById = 'get-animal-by-id', // GET
  GetAllAnimals = 'get-all-animals', // GET
  UpdateAnimalById = 'put-animal-by-id', // PUT

  CreateBehavior = 'post-behavior', // POST
  GetBehaviors = 'get-behaviors', // GET
  GetBehaviorById = 'get-behavior-by-id', // GET
  GetBehaviorByName = 'get-behavior-by-name' // GET
}
