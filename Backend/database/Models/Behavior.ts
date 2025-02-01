import mongoose from 'mongoose';
import { IBehavior } from '../../library/Types/Animal';

const schema = new mongoose.Schema<IBehavior>({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const Behavior = mongoose.model<IBehavior>('behaviors', schema);
