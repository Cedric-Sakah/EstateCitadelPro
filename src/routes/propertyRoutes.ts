import express from 'express';
import { PropertyRepository } from '../repositories/propertyRepository';
import { PropertyService } from '../services/propertyService';
import { PropertyController } from '../controllers/propertyController';

const router = express.Router();
const propertyRepository = new PropertyRepository();
const propertyService = new PropertyService(propertyRepository);
const propertyController = new PropertyController(propertyService);

router.post('/', propertyController.createProperty.bind(propertyController));
router.get('/:id', propertyController.getProperty.bind(propertyController));
router.get('/owner/:ownerId', propertyController.getOwnerProperties.bind(propertyController));
router.put('/:id', propertyController.updateProperty.bind(propertyController));
router.delete('/:id', propertyController.deleteProperty.bind(propertyController));

export default router;