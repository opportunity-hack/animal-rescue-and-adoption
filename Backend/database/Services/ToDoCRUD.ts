import { Types } from 'mongoose';
import { DBCatchable } from '../../library/Decorators/DBCatchable';
import { ToDoItemWithId, TodoStatus } from '../../library/Types/ToDo';
import { ToDo } from '../Models/ToDo';

export class ToDoCRUD {
  @DBCatchable('Error upserting todos')
  public static async upsertCrud(
    todos: ToDoItemWithId[],
    userId: string
  ): Promise<void> {
    const now = new Date();
    const bulkOps = todos.map((todo) => {
      const commonFields = {
        text: todo.text,
        completed: todo.completed,
        user_id: new Types.ObjectId(userId),
        updated_at: now
      };

      if (Types.ObjectId.isValid(todo.id)) {
        return {
          updateOne: {
            filter: { _id: new Types.ObjectId(todo.id) },
            update: {
              $set: commonFields,
              $setOnInsert: { created_at: now }
            },
            upsert: true
          }
        };
      } else {
        return {
          insertOne: {
            document: {
              ...commonFields,
              created_at: now
            }
          }
        };
      }
    });

    await ToDo.bulkWrite(bulkOps);
  }

  @DBCatchable('Error fetching todo by ID')
  public static async getTodoById(id: string): Promise<ToDoItemWithId | null> {
    const todo = await ToDo.findOne({ id }).lean();
    return todo
      ? { id: todo._id.toString(), text: todo.text, completed: todo.completed }
      : null;
  }

  @DBCatchable('Error fetching user todos')
  public static async getUserTodos(userId: string): Promise<ToDoItemWithId[]> {
    const todos = await ToDo.find({
      user_id: new Types.ObjectId(userId),
      completed: { $ne: TodoStatus.DELETED } // Exclude deleted todos
    }).lean();
    return todos.map((todo) => ({
      id: todo._id.toString(),
      text: todo.text,
      completed: todo.completed
    }));
  }
}
