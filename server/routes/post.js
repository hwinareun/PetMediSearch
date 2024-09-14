const express = require('express')
const { getPostById, addPostById, updatePostById, deletePostById } = require('../controller/post')
const router = express.Router()

//특정 글 상세 조회 (해당 글에 속하는 댓글도 같이 조회)
router.get('/:post_id', getPostById)

//글 작성
router.post('/', addPostById)

//글 수정
router.put('/:post_id', updatePostById)

//글 삭제
router.delete('/:post_id', deletePostById)

module.exports = router;