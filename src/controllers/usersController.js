import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { serverAnswers } from '../assets/const.js';
import { usersCollection, sessionsCollection } from '../database/db.js';

const signUpPost = async (req, res) => {
  const { name, email, password } = req.body;
  // VALIDATE DATA
  try {
    const user = await usersCollection.findOne({ email });
    if (user !== null) {
      return res
        .status(serverAnswers.newUser.userAlreadyExists.code)
        .send(serverAnswers.newUser.userAlreadyExists.message);
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    await usersCollection.insertOne({ name, email, password: passwordHash });
    return res
      .status(serverAnswers.newUser.userCreated.code)
      .send(serverAnswers.newUser.userCreated.message);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
const signInPost = async (req, res) => {
  const { email, password } = req.body;
  // VALIDATE DATA
  try {
    const user = await usersCollection.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuidv4();
      await sessionsCollection.insertOne({
        token,
        userId: user._id,
        lastSeen: Date.now(),
      });
      return res.send(token);
    }
    return res
      .status(serverAnswers.login.userNotFound.code)
      .send(serverAnswers.login.userNotFound.message);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

export { signUpPost, signInPost };
