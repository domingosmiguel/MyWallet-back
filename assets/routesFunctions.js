import bcrypt from 'bcrypt';
import { MongoClient, ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { collections, databaseName, serverAnswers } from './assets/const.js';

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
let users;
let sessions;
let transactions;

mongoClient.connect().then(() => {
  db = mongoClient.db(`${databaseName}`);
  users = db.collection(collections.users);
  sessions = db.collection(collections.sessions);
  transactions = db.collection(collections.transactions);
});

const signUpPost = async (req, res) => {
  const { name, email, password } = req.body;
  // VALIDATE DATA
  try {
    const user = await users.findOne({ email });
    if (user !== null) {
      return res
        .status(serverAnswers.newUser.userAlreadyExists.code)
        .send(serverAnswers.newUser.userAlreadyExists.message);
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    await users.insertOne({ name, email, password: passwordHash });
    return res.sendStatus(serverAnswers.newUser.userCreated.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
const signInPost = async (req, res) => {
  const { email, password } = req.body;
  // VALIDATE DATA
  try {
    const user = await users.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuidv4();
      await sessions.insertOne({ token, userId: user._id });
      return res.send(token);
    }
    return res.sendStatus(serverAnswers.login.userNotFound.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

const transactionsGet = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) {
    return res.sendStatus(serverAnswers.transactions.unauthorized.code);
  }
  try {
    const session = await sessions.findOne({ token });

    if (!session) {
      return res.sendStatus(serverAnswers.transactions.unauthorized.code);
    }
    const user = await users.findOne({ _id: session.userId });

    if (!user) {
      return res.sendStatus(serverAnswers.transactions.userNotFound.code);
    }
    delete user.password;
    const userTransactions = transactions.find({ userId: user._id });
    return res.send({ user, userTransactions });
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

const transactionPost = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(serverAnswers.transactions.unauthorized.code);
  }
  const way = req.params.way.toLowerCase();
  const { description, date } = req.body;
  const value = Math.abs(parseInt(req.body.value, 10));
  // VALIDATE DATA

  try {
    const session = await sessions.findOne({ token });

    if (!session) {
      return res.sendStatus(serverAnswers.transactions.unauthorized.code);
    }
    await transactions.insertOne({
      userId: session.userId,
      value,
      description,
      way,
      date,
    });
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

const transactionPut = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(serverAnswers.transactions.unauthorized.code);
  }
  const { id } = req.params;
  const { description, date, way } = req.body;
  const value = Math.abs(parseInt(req.body.value, 10));
  // VALIDATE DATA

  try {
    const session = await sessions.findOne({ token });

    if (!session) {
      return res.sendStatus(serverAnswers.transactions.unauthorized.code);
    }
    const { modifiedCount } = await transactions.updateOne(
      { $and: [{ _id: ObjectId(id) }, { userId: session.userId }] },
      { $set: { value, description, way, date } }
    );
    if (modifiedCount === 0) {
      return res.sendStatus(
        serverAnswers.transactions.transactionNotFound.code
      );
    }
    return res.sendStatus(serverAnswers.transactions.transactionUpdated.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

const transactionDelete = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(serverAnswers.transactions.unauthorized.code);
  }
  const { id } = req.params;
  // VALIDATE DATA

  try {
    const session = await sessions.findOne({ token });

    if (!session) {
      return res.sendStatus(serverAnswers.transactions.unauthorized.code);
    }
    const { deletedCount } = await transactions.deleteOne({
      $and: [{ _id: ObjectId(id) }, { userId: session.userId }],
    });
    if (deletedCount === 0) {
      return res.sendStatus(
        serverAnswers.transactions.transactionNotFound.code
      );
    }
    return res.sendStatus(serverAnswers.transactions.transactionUpdated.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

export {
  signUpPost,
  signInPost,
  transactionsGet,
  transactionPost,
  transactionPut,
  transactionDelete,
};
