const fs = require('fs');

const userName = 'Alex';

fs.writeFile('user-data.txt', 'Name: ' + userName, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('it is written');
});
