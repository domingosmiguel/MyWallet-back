import { ObjectId } from 'mongodb';
import { serverAnswers } from '../assets/const.js';
import { recordsCollection, usersCollection } from '../database/db.js';

const recordsGet = async (req, res) => {
  const { session } = res.locals;

  try {
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
  const { session } = res.locals;
  const { value, description, way, date } = res.locals.body;

  try {
    await recordsCollection.insertOne({
      userId: session.userId,
      value,
      description,
      way,
      date,
      timeCreated: Date.now(),
    });
    return res
      .status(serverAnswers.records.recordCreated.code)
      .send(serverAnswers.records.recordCreated.message);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
const recordEditGet = async (req, res) => {
  const { session } = res.locals;
  const { id } = req.params;
  try {
    const record = await recordsCollection.findOne({
      $and: [{ _id: ObjectId(id) }, { userId: session.userId }],
    });
    if (!record) {
      return res
        .status(serverAnswers.records.recordNotFound.code)
        .send(serverAnswers.records.recordNotFound.message);
    }
    return res.send(record);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
const recordEditPut = async (req, res) => {
  const { session } = res.locals;
  const { value, description, way, date } = res.locals.body;

  const { id } = req.params;

  try {
    const { modifiedCount } = await recordsCollection.updateOne(
      { $and: [{ _id: ObjectId(id) }, { userId: session.userId }] },
      { $set: { value, description, way, date } }
    );
    if (modifiedCount === 0) {
      return res
        .status(serverAnswers.records.recordNotFound.code)
        .send(serverAnswers.records.recordNotFound.message);
    }
    return res
      .status(serverAnswers.records.recordUpdated.code)
      .send(serverAnswers.records.recordUpdated.message);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};
const recordDelete = async (req, res) => {
  const { session } = res.locals;
  const { id } = req.params;

  try {
    const { deletedCount } = await recordsCollection.deleteOne({
      $and: [{ _id: ObjectId(id) }, { userId: session.userId }],
    });
    if (deletedCount === 0) {
      return res
        .status(serverAnswers.records.recordNotFound.code)
        .send(serverAnswers.records.recordNotFound.message);
    }
    return res
      .status(serverAnswers.records.recordDeleted.code)
      .send(serverAnswers.records.recordDeleted.message);
  } catch (error) {
    return res.sendStatus(serverAnswers.databaseProblem.code);
  }
};

export { recordDelete, recordEditGet, recordEditPut, recordPost, recordsGet };
