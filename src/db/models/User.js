import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

// userSchema.index({ email: 1 });

export const User = model('User', userSchema);
