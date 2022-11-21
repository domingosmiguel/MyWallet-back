import loginSchema from '../schemas/registrationSchema.js';
import { serverAnswers } from '../assets/const.js';

export default function registerValidationMiddleware(req, res, next) {
  const { body } = req;

  const { name, email, password, repeatPassword } = body;

  const validation = loginSchema.validate(
    { name, email, password, repeatPassword },
    { abortEarly: false }
  );
  if (validation.error) {
    const erros = validation.error.details.map((detail) => detail.message);
    return res.status(serverAnswers.records.invalidData.code).send(erros);
  }
  if (password !== repeatPassword) {
    return res
      .status(serverAnswers.records.invalidData.code)
      .send('Passwords must be equal');
  }
  res.locals.body = body;
  next();
}
