var vogels = require('vogels');

vogels.createTables({
  'User': { readCapacity: 5, writeCapacity: 10 },
  'FriendChannel': { readCapacity: 20, writeCapacity: 4 },
}, function(err) {
  if (err) {
    console.log('Error creating tables: ', err);
  } else {
    console.log('Tables has been created');
  }
});
