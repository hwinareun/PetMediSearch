const router = require("express").Router()


/**
 * @swagger
 * paths:
 *  /api/test:
 *    get:
 *      summary: "데이터 전체 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Test]
 *      responses:
 *        "200":
 *          description: 테스트 데이터
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    data:
 *                      type: object
 *                      example:
 *                          [
 *                            { "test": "ok" },
 *                          ]
 */
router.get('/', (req, res) => {
    res.json({ message: 'API is working!' });
});

module.exports = router