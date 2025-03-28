import { Property, PropertyDocument } from '../models/Property';
import { Types } from 'mongoose';

export interface IPropertyRepository {
  create(propertyData: Omit<PropertyDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<PropertyDocument>;
  findById(id: string): Promise<PropertyDocument | null>;
  findByOwner(ownerId: string): Promise<PropertyDocument[]>;
  update(id: string, propertyData: Partial<PropertyDocument>): Promise<PropertyDocument | null>;
  delete(id: string): Promise<boolean>;
}

export class PropertyRepository implements IPropertyRepository {
  async create(propertyData: Omit<PropertyDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<PropertyDocument> {
    return Property.create(propertyData);
  }

  async findById(id: string): Promise<PropertyDocument | null> {
    return Property.findById(id).populate('ownerId');
  }

  async findByOwner(ownerId: string): Promise<PropertyDocument[]> {
    return Property.find({ ownerId }).populate('ownerId');
  }

  async update(id: string, propertyData: Partial<PropertyDocument>): Promise<PropertyDocument | null> {
    return Property.findByIdAndUpdate(id, propertyData, { new: true }).populate('ownerId');
  }

  async delete(id: string): Promise<boolean> {
    const result = await Property.findByIdAndDelete(id);
    return !!result;
  }
}