import mongoose from 'mongoose';
import { DefaultRoles } from '../../library/Types/UserRole';

export interface IUser {
  _id: string;
  google_id: string;
  email: string;
  name: string;
  picture: string;
  role: mongoose.Schema.Types.ObjectId | string;
}

const schema = new mongoose.Schema<IUser>({
  google_id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_roles',
    required: true,
    enum: DefaultRoles
  }
});

export const User = mongoose.model('users', schema);
