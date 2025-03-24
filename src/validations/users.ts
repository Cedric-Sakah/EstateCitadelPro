import Joi from 'joi';
import { UserInput } from '../models/User';

export const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(250).required(),
  userType: Joi.string().valid('owner', 'customer').required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
  phone: Joi.string().required(),
  password: Joi.string().min(6).max(250).required(),
});

export function validateUser(user: UserInput): Joi.ValidationResult<UserInput> {
  return userValidationSchema.validate(user);
}