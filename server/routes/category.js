const express = require('express')
const { getListByCategory } = require('../controller/category')
const router = express.Router()

/**
 * @swagger
 * /category:
 *   get:
 *     summary: 카테고리별 게시글 목록 조회
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 조회할 게시글 ID
 *     description: 카테고리 내의 게시글 목록을 조회합니다. 각 게시글에는 제목, 작성자, 작성일이 포함됩니다.
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "post1"
 *                   author:
 *                     type: string
 *                     example: "user1"
 *                   created_at:
 *                     type: string
 *                     example: "date1"
 */
router.get('/:category_id', getListByCategory)

module.exports = router;