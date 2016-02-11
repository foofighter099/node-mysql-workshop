/*Exercise 3: Joining up the data, part 1

Write a program that fetches all the accounts and their addressbooks.
Output one line for each account as in Exercise 4, followed by a listing of all the address book names for that account, one per line
Make the output look nice in any way you like
Here is an example:
#1: john@smith.com
  business contacts
  friends
#2: jane@smith.com
  ...
*/
var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : "localhost",
  user     : "foofighter0991",
  password : '',
  database : 'addressbook'
});

connection.query('select Account.id as accountId, Account.email as accountEmail, AddressBook.name as addressBookName from Account join AddressBook on Account.id=AddressBook.accountId', function(err, results) {

    var accounts = results.reduce(
        function(acc, curr) {
            // this uses Array.prototype.findIndex to get the index of an object
            // that has the same first name as our current person's first name
            var idx = acc.findIndex(function(item) {
                return item.accountId === curr.accountId;
            });
            // If we find an object that has the same first name, we just push the current person to it
            if (idx >= 0) {
                acc[idx].aBooks.push({
                    addressBookId: curr.addressBookId,
                    addressBookName: curr.addressBookName
                    });
            }
            // If we don't (like the first time for sure), then we push an entry for that first name
            else {
                acc.push({
                    accountId: curr.accountId,
                    accountEmail: curr.accountEmail,
                    aBooks: [{
                        addressBookId: curr.addressBookId,
                        addressBookName: curr.addressBookName
                    }]
                });
                console.log('#' + curr.accountId + ': ' + curr.accountEmail);
            }
            console.log("   " + curr.addressBookName);
            return acc; // THIS RETURNED VALUE WILL BE USED THE NEXT TIME AROUND THE REDUCE LOOP
        }, [] // this is the starting point of our reduce
    );

    
    
    connection.end(); 
});