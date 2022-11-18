import { ObjectId } from 'mongodb';
import { serverAnswers } from '../assets/const.js';
import {
  usersCollection,
  sessionsCollection,
  recordsCollection,
} from '../database/db.js';

const recordsGet = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) {
    return res.sendStatus(serverAnswers.records.unauthorized.code);
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    if (!session) {
      return res.sendStatus(serverAnswers.records.unauthorized.code);
    }
    sessionsCollection.updateOne({ token }, { $set: { lastSeen: Date.now() } });

    const user = await usersCollection.findOne({ _id: session.userId });

    if (!user) {
      return res.sendStatus(serverAnswers.records.userNotFound.code);
    }
    delete user.password;
    const userRecords = await recordsCollection
      .find({ userId: user._id })
      .sort({ date: -1, timeCreated: -1 })
      .toArray();
    return res.send({ user, userRecords });
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
const recordPost = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(serverAnswers.records.unauthorized.code)
      .send(serverAnswers.records.unauthorized.message);
  }
  const way = req.params.way.toLowerCase();
  const { description, date } = req.body;
  const value = Math.abs(parseFloat(req.body.value)).toFixed(2);
  // VALIDATE DATA

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.sendStatus(serverAnswers.records.unauthorized.code);
    }
    sessionsCollection.updateOne({ token }, { $set: { lastSeen: Date.now() } });

    await recordsCollection.insertOne({
      userId: session.userId,
      value,
      description,
      way,
      date,
      timeCreated: Date.now(),
    });
    return res.sendStatus(serverAnswers.records.recordCreated.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
const recordEditGet = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  if (!token) {
    return res.sendStatus(serverAnswers.records.unauthorized.code);
  }
  const { id } = req.params;
  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.sendStatus(serverAnswers.records.unauthorized.code);
    }
    sessionsCollection.updateOne({ token }, { $set: { lastSeen: Date.now() } });

    const record = await recordsCollection.findOne({
      $and: [{ _id: ObjectId(id) }, { userId: session.userId }],
    });
    if (!record) {
      return res.sendStatus(serverAnswers.records.recordNotFound.code);
    }
    return res.send(record);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
const recordEditPut = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(serverAnswers.records.unauthorized.code);
  }
  const { id } = req.params;
  const { description, date, way } = req.body;
  const value = Math.abs(parseFloat(req.body.value)).toFixed(2);
  // VALIDATE DATA

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.sendStatus(serverAnswers.records.unauthorized.code);
    }
    sessionsCollection.updateOne({ token }, { $set: { lastSeen: Date.now() } });

    const { modifiedCount } = await recordsCollection.updateOne(
      { $and: [{ _id: ObjectId(id) }, { userId: session.userId }] },
      { $set: { value, description, way, date } }
    );
    if (modifiedCount === 0) {
      return res.sendStatus(serverAnswers.records.recordNotFound.code);
    }
    return res.sendStatus(serverAnswers.records.recordUpdated.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
const recordDelete = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(serverAnswers.records.unauthorized.code);
  }
  const { id } = req.params;
  // VALIDATE DATA

  try {
    const session = await sessionsCollection.findOne({ token });

    if (!session) {
      return res.sendStatus(serverAnswers.records.unauthorized.code);
    }
    sessionsCollection.updateOne({ token }, { $set: { lastSeen: Date.now() } });

    const { deletedCount } = await recordsCollection.deleteOne({
      $and: [{ _id: ObjectId(id) }, { userId: session.userId }],
    });
    if (deletedCount === 0) {
      return res.sendStatus(serverAnswers.records.recordNotFound.code);
    }
    return res.sendStatus(serverAnswers.records.recordUpdated.code);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

export { recordsGet, recordPost, recordEditGet, recordEditPut, recordDelete };
