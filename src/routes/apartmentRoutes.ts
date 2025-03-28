import { Router } from 'express';
import Joi from 'joi';
import { ApartmentController } from '../controllers/apartmentController';
import { 
  createApartmentValidation,
  updateApartmentValidation 
} from '../validations/apartment';

const router = Router();
const apartmentController = new ApartmentController();

// Simple validation middleware
const validate = (schema: Joi.Schema) => (req: any, res: any, next: any) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  next();
};

router.post('/', validate(createApartmentValidation), apartmentController.createApartment);
router.get('/', apartmentController.getAllApartments);
router.get('/:id', apartmentController.getApartment);
router.put('/:id', validate(updateApartmentValidation), apartmentController.updateApartment);
router.delete('/:id', apartmentController.deleteApartment);
router.get('/property/:propertyId', apartmentController.getApartmentsByProperty);

export default router;