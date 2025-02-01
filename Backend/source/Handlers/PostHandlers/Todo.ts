import { Catchable } from '../../../library/Decorators/Catchable';
import {
  Handler,
  ServerEvent
} from '../../../library/Interfaces/HandlerController';
import { ToDoCRUD } from '../../../database/Services/ToDoCRUD';
import { HttpStatusCode } from 'axios';
import { IToDoItem, ToDoItemWithId } from '../../../library/Types/ToDo';
import { v4 as uuidv4 } from 'uuid';

export class ToDo extends Handler<ServerEvent> {
  private todosToSave: IToDoItem[];

  constructor(event: ServerEvent) {
    super(event);
    this.todosToSave = event.req.body.todos as IToDoItem[];
  }

  @Catchable()
  async execute(): Promise<void> {
    const itemsWithId: ToDoItemWithId[] = this.todosToSave.map((todo) => ({
      ...todo,
      id: todo.id || uuidv4()
    }));

    const userId = (this.event.req as any).user.existingUser._id;
    await ToDoCRUD.upsertCrud(itemsWithId, userId);
    this.event.res
      .status(HttpStatusCode.Ok)
      .json({ message: 'To Do List Saved' });
    return;
  }
}
