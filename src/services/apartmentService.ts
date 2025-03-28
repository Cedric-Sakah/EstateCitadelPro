import { ApartmentRepository } from '../repositories/apartmentRepository';
import { IApartment, IApartmentDocument } from '../models/Apartment';

export class ApartmentService {
  constructor(private apartmentRepository: ApartmentRepository) {}

  public async createApartment(apartmentData: IApartment): Promise<IApartmentDocument> {
    try {
      return await this.apartmentRepository.create(apartmentData);
    } catch (error) {
      throw new Error('Error creating apartment');
    }
  }

  public async getApartmentById(id: string): Promise<IApartmentDocument> {
    const apartment = await this.apartmentRepository.findById(id);
    if (!apartment) {
      throw new Error('Apartment not found');
    }
    return apartment;
  }

  public async getAllApartments(): Promise<IApartmentDocument[]> {
    return this.apartmentRepository.findAll();
  }

  public async updateApartment(
    id: string,
    apartmentData: Partial<IApartment>
  ): Promise<IApartmentDocument> {
    const apartment = await this.apartmentRepository.update(id, apartmentData);
    if (!apartment) {
      throw new Error('Apartment not found');
    }
    return apartment;
  }

  public async deleteApartment(id: string): Promise<void> {
    const apartment = await this.apartmentRepository.delete(id);
    if (!apartment) {
      throw new Error('Apartment not found');
    }
  }

  public async getApartmentsByProperty(propertyId: string): Promise<IApartmentDocument[]> {
    return this.apartmentRepository.findByPropertyId(propertyId);
  }
}