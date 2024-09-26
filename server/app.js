const express = require("express");
const mysql = require("./mysql");
const nodePath = require("path");
const app = express();
const port = 8080;

console.log('Current directory:', __dirname);

const cors = require("cors");
app.use(cors({ origin: "http://localhost:5000", credentials: true }));

app.use(express.json());

// swagger 연동
const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static("public"));

app.get("/search", (req, res) => {
  res.sendFile(nodePath.join(__dirname, "public", "search.html"));
});

// 지도에 위치 표시
app.get("/facilities", async (req, res) => {
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

  try {
    const [results] = await mysql.query(query, values);
    console.log(`Query returned ${results.length} results`);
    res.json(results);
  } catch (err) {
    console.error('Database query error:', err);
    console.error('Error details:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// 나머지 코드는 그대로 유지

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});