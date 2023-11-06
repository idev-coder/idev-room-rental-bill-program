
const db = {};

db['rooms'] = require('./room')
db['invoices'] = require('./invoice')

module.exports = db;