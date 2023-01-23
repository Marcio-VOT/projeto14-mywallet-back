import Joi from "joi";

export const dataPostSchema = Joi.object({
  disc: Joi.string().max(255).required(),
  value: Joi.number().positive().min(1).required(),
  type: Joi.boolean().required(),
});
