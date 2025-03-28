import Joi from 'joi';

export const createApartmentValidation = Joi.object({
  propertyId: Joi.string().required(),
  apartmentNumber: Joi.number().required(),
  available: Joi.boolean()
});

export const updateApartmentValidation = Joi.object({
  apartmentNumber: Joi.number(),
  available: Joi.boolean()
});