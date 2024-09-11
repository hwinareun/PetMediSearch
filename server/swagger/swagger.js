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
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routers/*.js"],
}
const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }