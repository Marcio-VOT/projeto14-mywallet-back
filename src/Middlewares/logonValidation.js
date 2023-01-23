import { registerSchema } from "../Model/logonSchema.js";

export async function registerValidation(req, res, next) {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
