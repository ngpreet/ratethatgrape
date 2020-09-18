const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.DBUrl;
db.wines = require('./wine.model.js')(mongoose);

module.exports = db;