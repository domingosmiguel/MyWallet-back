import recordDataSchema from '../schemas/recordDataSchema.js';
import { serverAnswers } from '../assets/const.js';

export default function newRecordValidationMiddleware(req, res, next) {
  const { body } = req;
  body.way = body.way?.toLowerCase() || req.params.way?.toLowerCase();
  body.value = parseFloat(body.value).toFixed(2);

  const { value, way, description, date } = body;

  const validation = recordDataSchema.validate(
    { value, way, description, date },
    { abortEarly: false }
  );

  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    return res.status(serverAnswers.records.invalidData.code).send(erros);
  }

  res.locals.body = body;
  next();
}
