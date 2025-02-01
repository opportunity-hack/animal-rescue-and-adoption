import mongoose from 'mongoose';
import { IToDo, TodoStatus } from '../../library/Types/ToDo';

const schema = new mongoose.Schema<IToDo>({
  created_at: {
    type: Date,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Number,
    enum: TodoStatus,
    default: TodoStatus.NOT_DONE,
    required: true
  }
});

export const ToDo = mongoose.model('todo', schema);
