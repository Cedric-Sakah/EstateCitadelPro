import mongoose, { Schema, Document, Types } from 'mongoose';

export interface PropertyDocument extends Document {
  name: string;
  description: string;
  location: string;
  ownerId: Types.ObjectId;
  image?: {
    data: Buffer;
    contentType: string;
  };
  date: Date;
}

const PropertySchema = new Schema<PropertyDocument>(
  {
    name: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true, maxlength: 500 },
    location: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: {
      path: { type: String },
      mimetype: { type: String }
    },
    date: { type: Date, default: Date.now }
  },  { timestamps: true }
);

export const Property = mongoose.model<PropertyDocument>('Property', PropertySchema);