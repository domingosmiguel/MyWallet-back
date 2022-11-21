import loginSchema from '../schemas/loginSchema.js';
import { serverAnswers } from '../assets/const.js';

export default function loginValidationMiddleware(req, res, next) {
  const { body } = req;
  console.log(
    '🚀 ~ file: loginValidationMiddleware.js ~ line 6 ~ loginValidationMiddleware ~ body',
    body
  );

  const { email, password } = body;

  const validation = loginSchema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    return res.status(serverAnswers.records.invalidData.code).send(erros);
  }

  res.locals.body = body;
  next();
}
