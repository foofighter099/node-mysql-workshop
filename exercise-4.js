/*Exercise 4: More about joins...

Notice that for the previous exercise, Account #5 did not appear in the listing. Don't come back here until you have re-checked the previous exercise and noticed for yourself that Account #5 is missing.
The reason for this is because Account #5 does not have any AddressBook, so doing the JOIN left it out.
Read and understand this article on SQL JOINs, more specifically about the LEFT JOIN.
Based on your new understanding, create a similar program to Exercise #4.
The only difference, if an account does not have any address book, print it like this:
#3: xxx@yyy.com
  --no address books-- */
  
var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
  host     : "localhost",
  user     : "foofighter0991",
  password : '',
  database : 'addressbook'
});

connection.query('select Account.id as accountId, Account.email as accountEmail, AddressBook.name as addressBookName from Account left join AddressBook on Account.id=AddressBook.accountId', function(err, results) {

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
            if (curr.addressBookName === null) {
                console.log("   " + '---no address books--');
            }else{ 
                console.log("   " + curr.addressBookName);
            }
            return acc; // THIS RETURNED VALUE WILL BE USED THE NEXT TIME AROUND THE REDUCE LOOP
        }, [] // this is the starting point of our reduce
    );

    
    
    connection.end(); 
});