import { serverAnswers } from '../assets/const.js';
import { sessionsCollection } from '../database/db.js';

export default async function authValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) {
    return res
      .status(serverAnswers.records.unauthorized.code)
      .send(serverAnswers.records.unauthorized.message);
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    if (!session) {
      return res.sendStatus(serverAnswers.records.unauthorized.code);
    }
    res.locals.session = session;
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
  next();
}
