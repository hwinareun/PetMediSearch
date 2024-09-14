const express = require('express')
const { getPostById, addPostById, updatePostById, deletePostById } = require('../controller/post')
const router = express.Router()

/**
 * @swagger
 * /posts/{post_id}:
 *   get:
 *     summary: 특정 게시글 조회 (해당 글에 속하는 댓글도 함께 조회)
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                 content:
 *                   type: string
 */
router.get('/:post_id', getPostById)

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: 게시글 작성
 *     tags:
 *       - Post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: 게시글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "새로운 게시글이 등록되었습니다."
 */
router.post('/', addPostById)

/**
 * @swagger
 * /posts/{post_id}:
 *   put:
 *     summary: 게시글 수정
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "게시글이 수정되었습니다."
 */
router.put('/:post_id', updatePostById)

/**
 * @swagger
 * /posts/{post_id}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags:
 *       - Post
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "게시글이 삭제되었습니다."
 */
router.delete('/:post_id', deletePostById)

module.exports = router
