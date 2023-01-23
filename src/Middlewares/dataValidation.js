import { dataPostSchema } from "../Model/dataSchema.js";

export async function dataPostValidation(req, res, next) {
  const { error } = dataPostSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}
