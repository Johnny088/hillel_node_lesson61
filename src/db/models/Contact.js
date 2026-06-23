import { model, Schema } from 'mongoose';

export const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { versionKey: false },
);

export const Contact = model('Contact', contactSchema);
