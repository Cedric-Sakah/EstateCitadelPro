import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  userType: 'owner' | 'customer';
  email: string;
  phone: string;
  password: string;
}

export interface UserInput {
  name: string;
  userType: 'owner' | 'customer';
  email: string;
  phone: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 250 },
    userType: { type: String, enum: ['owner', 'customer'], required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true,minlength: 9, maxlength: 9 },
    password: { type: String, required: true, minlength: 6, maxlength: 250 },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>('User', UserSchema);