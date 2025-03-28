import { Request, Response, NextFunction } from 'express';
import { ApartmentService } from '../services/apartmentService';
import { ApartmentRepository } from '../repositories/apartmentRepository';
import { IApartmentDocument } from '../models/Apartment';

export class ApartmentController {
  private apartmentService: ApartmentService;

  constructor() {
    this.apartmentService = new ApartmentService(new ApartmentRepository());
  }

  public createApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apartment = await this.apartmentService.createApartment(req.body);
      res.status(201).json(apartment);
    } catch (error) {
      next(error);
    }
  };

  public getApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apartment = await this.apartmentService.getApartmentById(req.params.id);
      res.status(200).json(apartment);
    } catch (error) {
      next(error);
    }
  };

  public getAllApartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apartments = await this.apartmentService.getAllApartments();
      res.status(200).json(apartments);
    } catch (error) {
      next(error);
    }
  };

  public updateApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apartment = await this.apartmentService.updateApartment(
        req.params.id,
        req.body
      );
      res.status(200).json(apartment);
    } catch (error) {
      next(error);
    }
  };

  public deleteApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.apartmentService.deleteApartment(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  public getApartmentsByProperty = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const apartments = await this.apartmentService.getApartmentsByProperty(
        req.params.propertyId
      );
      res.status(200).json(apartments);
    } catch (error) {
      next(error);
    }
  };
}