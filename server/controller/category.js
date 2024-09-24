const conn = require('../mysql');

const getListByCategory = (req, res) => {
    const categoryId = req.query.category;
    console.log(categoryId)
    if (!categoryId) {
        return res.status(400).send({ message: '카테고리 ID가 필요합니다.' });
    }

    const category_id = parseInt(categoryId, 10);
    if (isNaN(category_id)) {
        return res.status(400).send({ message: '유효한 카테고리 ID가 필요합니다.' });
    }

    const query = `
        SELECT p.post_id, p.title, p.content, p.created_at, u.username
        FROM posts p
        JOIN users u ON p.user_id = u.user_id
        WHERE p.category_id = ?
        ORDER BY p.created_at DESC
    `;

    conn.query(query, [category_id], (error, results) => {
        if (error) {
            return res.status(500).send({ message: '서버 오류 발생', error });
        }
        return res.send({ posts: results });
    });
}

module.exports = {
    getListByCategory
}