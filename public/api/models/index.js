
const db = {};

db['rooms'] = require('./room')
db['invoices'] = require('./invoice')
db['units'] = require('./unit')

module.exports = db;