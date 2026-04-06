const db = require('../config/db');
const { createId } = require('../utils/id');

const addLog = (collection, data) => {
  const record = {
    id: createId(),
    ...data,
    createdAt: new Date().toISOString()
  };
  db.get(collection).push(record).write();
  return record;
};

const getRecent = (collection, limit = 20) => {
  return db.get(collection).takeRight(limit).value();
};

module.exports = { addLog, getRecent };
