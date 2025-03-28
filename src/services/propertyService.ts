import { IPropertyRepository } from '../repositories/propertyRepository';
import { PropertyDocument } from '../models/Property';

export class PropertyService {
  constructor(private propertyRepository: IPropertyRepository) {}

  async createProperty(propertyData: Omit<PropertyDocument, '_id' | 'createdAt' | 'updatedAt'>): Promise<PropertyDocument> {
    return this.propertyRepository.create(propertyData);
  }

  async getPropertyById(id: string): Promise<PropertyDocument | null> {
    return this.propertyRepository.findById(id);
  }

  async getPropertiesByOwner(ownerId: string): Promise<PropertyDocument[]> {
    return this.propertyRepository.findByOwner(ownerId);
  }

  async updateProperty(id: string, propertyData: Partial<PropertyDocument>): Promise<PropertyDocument | null> {
    return this.propertyRepository.update(id, propertyData);
  }

  async deleteProperty(id: string): Promise<boolean> {
    return this.propertyRepository.delete(id);
  }
}