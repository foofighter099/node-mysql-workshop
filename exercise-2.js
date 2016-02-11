/*Exercise 2: Getting back our data

Write a program that fetches the first 5 accounts in the addressbook database
For each account, console.log a line with the account's ID and email, like this: #1:email@domain.com
Use the colors NPM module with the .bold option to achieve this effect 
*/
var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : "localhost",
  user     : "foofighter0991",
  password : '',
  database : 'addressbook'
});

connection.query("select * from Account limit 5", function(err, rows, fields) {
    rows.forEach(function(row) {
    console.log(('#' + row.id).bold + ': ' + row.email);
  });
  
  connection.end();
  
});