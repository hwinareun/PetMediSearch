const express = require('express');
const router = express.Router();
const mysql = require('../mysql');

router.get("/", (req, res) => {
  const { type, keyword } = req.query;
  let query = "SELECT * FROM medical_facilities WHERE 1=1";
  const values = [];

  if (type) {
    query += " AND type = ?";
    values.push(type);
  }

  if (keyword) {
    query += " AND (bplcnm LIKE ? OR rdnwhladdr LIKE ? OR sitewhladdr LIKE ?)";
    values.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }

  query += " LIMIT 10000";

  console.log("Executing query:", query);
  console.log("Query values:", values);

  mysql.query(query, values, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      console.error('Error details:', JSON.stringify(err, null, 2));
      return res.status(500).json({ error: 'Internal server error', details: err.message });
    }

    console.log(`Query returned ${results.length} results`);
    res.json(results);
  });
});

module.exports = router;