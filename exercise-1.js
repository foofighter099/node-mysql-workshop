var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "localhost",
  user     : "foofighter0991",
  password : '',
  database : 'addressbook'
});

connection.connect();
connection.query('show databases', function(err, result) {
    console.log(result)
});

connection.end();