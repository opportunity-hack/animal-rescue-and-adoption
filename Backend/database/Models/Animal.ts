import mongoose, { Types } from 'mongoose';
import {
  IAnimalData,
  AnimalSex,
  AnimalStatus
} from '../../library/Types/Animal';

const schema = new mongoose.Schema<IAnimalData>({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: AnimalSex
  },
  status: {
    type: String,
    required: true,
    enum: AnimalStatus
  },
  images: {
    type: [String],
    required: true,
    match: /^https?:\/\/.*\.(png|jpg|jpeg|gif)$/
  },
  intakeDate: {
    type: Number,
    required: true,
    default: Date.now()
  },
  behaviors: [
    {
      type: Types.ObjectId,
      ref: 'behaviors',
      default: []
    }
  ],
  age: {
    type: Number,
    required: false
  },
  breed: {
    type: String,
    required: false
  },
  medicalInfo: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  notes: {
    type: String,
    required: false
  },
  weight: {
    type: Number,
    required: false
  }
});

export const Animal = mongoose.model<IAnimalData>('animals', schema);
