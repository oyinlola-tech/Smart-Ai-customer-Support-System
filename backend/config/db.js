const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const file = path.join(__dirname, '..', 'data', 'db.json');
const adapter = new FileSync(file);
const db = low(adapter);

db.defaults({
  messages: [],
  intents: [],
  salesReplies: [],
  productAnswers: [],
  summaries: [],
  whatsappProfiles: [],
  whatsappStates: [],
  whatsappMessages: []
}).write();

module.exports = db;
