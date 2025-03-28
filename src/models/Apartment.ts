import { Schema, model, Document, Types } from 'mongoose';

// Interface moved into model file
export interface IApartment {
  propertyId: Types.ObjectId;
  apartmentNumber: number;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IApartmentDocument extends IApartment, Document {}

const ApartmentSchema = new Schema<IApartmentDocument>(
  {
    propertyId: { 
      type: Schema.Types.ObjectId, 
      required: true, 
      ref: 'Property' 
    },
    apartmentNumber: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    available: { 
      type: Boolean, 
      default: true 
    }
  },
  { timestamps: true }
);

export default model<IApartmentDocument>('Apartment', ApartmentSchema);