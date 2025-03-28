import ApartmentModel, { IApartment, IApartmentDocument } from '../models/Apartment';

export class ApartmentRepository {
  public async create(apartmentData: IApartment): Promise<IApartmentDocument> {
    return ApartmentModel.create(apartmentData);
  }

  public async findById(id: string): Promise<IApartmentDocument | null> {
    return ApartmentModel.findById(id).exec();
  }

  public async findAll(): Promise<IApartmentDocument[]> {
    return ApartmentModel.find().exec();
  }

  public async update(
    id: string,
    apartmentData: Partial<IApartment>
  ): Promise<IApartmentDocument | null> {
    return ApartmentModel.findByIdAndUpdate(id, apartmentData, { new: true }).exec();
  }

  public async delete(id: string): Promise<IApartmentDocument | null> {
    return ApartmentModel.findByIdAndDelete(id).exec();
  }

  public async findByPropertyId(propertyId: string): Promise<IApartmentDocument[]> {
    return ApartmentModel.find({ propertyId }).exec();
  }
}