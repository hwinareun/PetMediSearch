const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: 'mysql',
  database: 'petmedisearch',
  dateStrings: true
});

conn.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
});

module.exports = conn;