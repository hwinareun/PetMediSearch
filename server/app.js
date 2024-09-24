const express = require("express");
const mysql = require('./mysql');
const path = require('path');  
const app = express();
const port = 8080;

app.use(express.json());

// swagger 연동
const { swaggerUi, specs } = require("./swagger/swagger")
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs))
app.use(express.static('public'));

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// 지도에 위치 표시
app.get('/api/facilities', (req, res) => {
    const { type, keyword } = req.query;
    let query = 'SELECT * FROM medical_facilities WHERE 1=1';
    const values = [];

    if (type) {
        query += ' AND type = ?';
        values.push(type);
    }

    if (keyword) {
        query += ' AND (bplcnm LIKE ? OR rdnwhladdr LIKE ?)';
        values.push(`%${keyword}%`, `%${keyword}%`);
    }

    query += ' LIMIT 10000';

    console.log('Executing query:', query);
    console.log('Query values:', values);

    mysql.query(query, values, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log(`Query returned ${results.length} results`);
        res.json(results);
    });
});

// 모든 사용자 조회
app.get('/users', (req, res) => {
    mysql.query('SELECT * FROM users', (err, results) => {
        if(err) {
            console.error('Database query error:', err);  
            res.status(500).json({error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

// 사용자 추가
app.post('/users', (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {  
        return res.status(400).json({ error: 'Username and email are required' });
    }
    mysql.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], (err, result) => {
        if(err) {
            console.error('Database insert error:', err);  
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.status(201).json({ id: result.insertId, username, email });
    });
});

// 사용자 삭제
app.delete('/users/:id', (req, res) => {
    mysql.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if(err) {
            console.error('Database delete error:', err);  
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        if(result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// 404 에러 처리
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' });
});

// router
const categoryRouter = require('./routes/category')
const postRouter = require('./routes/post')

// category
app.use('/category', categoryRouter)
app.use('/posts', postRouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
