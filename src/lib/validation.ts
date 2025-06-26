import joi from "joi";

export const validation = joi.object({
  email: joi.string().email,
  pwd: joi.string().min(8),
  name: joi.string().min(3),
});
