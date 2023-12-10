import { serverAnswers } from '../assets/const.js';
import recordDataSchema from '../schemas/recordDataSchema.js';

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
    console.error(erros);
    return res
      .status(serverAnswers.records.invalidData.code)
      .send(serverAnswers.records.invalidData.message);
  }

  res.locals.body = body;
  next();
}
