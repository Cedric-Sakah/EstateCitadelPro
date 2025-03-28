import Joi from 'joi';

export const propertyValidationSchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(500).required(),
  location: Joi.string().required(),
  ownerId: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  image: Joi.object({
    data: Joi.binary(),
    contentType: Joi.string().valid('image/jpeg', 'image/png', 'image/gif')
  }).optional()
  
});

export function validateProperty(property: unknown) {
  return propertyValidationSchema.validate(property);
}