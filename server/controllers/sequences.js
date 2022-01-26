const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
const db = client.db('midy');
const collection = db.collection('sequences');


async function readSequences() {
  await client.connect();
  const sequences = await collection
  .find()
  .sort({'_id': -1})
  .toArray();
  return sequences;
}

async function writeSequence(sequence) {
  await client.connect();
  const write = await collection
  .insertOne(sequence)
  return write;
}

async function deleteAll() {
  await client.connect();
  const deleteAll = await collection
  .deleteMany({})
  return deleteAll
}

module.exports = {
  readSequences,
  writeSequence,
  deleteAll
}