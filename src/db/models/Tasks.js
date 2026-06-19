import { Schema, model } from 'mongoose';
import { PRIORITY_STATE, STATUS } from '../../constants.js';

const tasksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: PRIORITY_STATE,
      required: true,
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: STATUS,
      default: 'new',
    },
  },
  { versionKey: false, timestamps: true },
);

export const Task = model('Task', tasksSchema);
