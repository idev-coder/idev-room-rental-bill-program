const { setup: setupRoute } = require('./routes')
const db = require('./config/db')

exports.setupApi = () => {

    setupRoute();

    db.sync()

}