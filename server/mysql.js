const mysql = require('mysql2');

console.log('Creating database pool');

const pool = mysql.createPool({
  host: 'DB_HOST',
  user: 'DB_USER',
  password: 'DB_PASSWORD', 
  database: 'DB_NAME',
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 연결 테스트
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database');
    connection.release();
  }
});

module.exports = pool.promise();