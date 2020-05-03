var mysql = require('mysql');
var util = require('util');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "febri123",
  database: "user_management",
});

const query = util.promisify(con.query).bind(con);

module.exports = query;