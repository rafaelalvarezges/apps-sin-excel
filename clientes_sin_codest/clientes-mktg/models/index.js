const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
var bd = dbConfig.bd
var host = dbConfig.host
var port = dbConfig.port
var usr = dbConfig.user
var pwd = dbConfig.password

var url = "mongodb://" + usr + ":" + pwd + "@" + host + ":" + port + "/" + bd 
db.url = url;
db.clients = require("./client.model.js")(mongoose);

module.exports = db;