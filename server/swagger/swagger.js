const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Pet Medi Search",
            description:
                "반려동물 병원 및 약국 조회 서비스",
        },
        tags: [
            {
                name: "Categories", // 태그 이름
                description: "카테고리 조회, 카테고리별 게시글 조회 api", // 태그 설명
            },
            {
                name: "Posts",
                description: "게시글 조회, 등록, 수정, 삭제 api",
            },
            {
                name: "Comments", // 태그 이름
                description: "댓글 조회, 등록, 수정, 삭제 api", // 태그 설명
            },
        ],
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes/*.js"],
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }