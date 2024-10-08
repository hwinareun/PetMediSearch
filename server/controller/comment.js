const conn = require('../mysql');

// 특정 게시글에 대한 댓글 조회
const getCommentsByPostId = (req, res) => {
    const post_id = req.params.post_id;

    const query = 'SELECT c.comment_id, c.content, c.created_at, u.username AS author, c.parent_comment_id FROM comments c JOIN users u ON c.user_id = u.user_id WHERE c.post_id = ? ORDER BY c.created_at ASC';

    conn.query(query, [post_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: '서버 에러 발생' });
        }

        return res.send(results);
    });
};

// 댓글 추가
const addComment = (req, res) => {
    const { post_id, user_id, content, parent_comment_id } = req.body;

    const query = 'INSERT INTO comments (post_id, user_id, content, parent_comment_id, created_at) VALUES (?, ?, ?, ?, NOW())';

    conn.query(query, [post_id, user_id, content, parent_comment_id || null], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: '서버 에러 발생' });
        }

        return res.send({ message: '새로운 댓글이 등록되었습니다.', commentId: results.insertId });
    });
};

// 댓글 수정
const updateCommentById = (req, res) => {
    const comment_id = req.params.comment_id;
    const { content } = req.body;

    const query = 'UPDATE comments SET content = ?, created_at = NOW() WHERE comment_id = ?';

    conn.query(query, [content, comment_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: '서버 에러 발생' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({ message: '해당 댓글을 찾을 수 없습니다.' });
        }

        return res.send({ message: '댓글이 수정되었습니다.' });
    });
};

// 댓글 삭제
const deleteCommentById = (req, res) => {
    const comment_id = req.params.comment_id;

    const query = 'DELETE FROM comments WHERE comment_id = ?';

    conn.query(query, [comment_id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: '서버 에러 발생' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({ message: '해당 댓글을 찾을 수 없습니다.' });
        }

        return res.send({ message: '댓글이 삭제되었습니다.' });
    });
};

module.exports = {
    getCommentsByPostId,
    addComment,
    updateCommentById,
    deleteCommentById
};
