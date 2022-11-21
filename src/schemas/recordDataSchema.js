import Joi from 'joi';

const recordDataSchema = Joi.object({
  value: Joi.number().greater(0).precision(2).required(),

  date: Joi.date().required(),

  description: Joi.string().required(),

  way: Joi.string()
    .pattern(/^(in|out)$/)
    .required(),
});

export default recordDataSchema;
