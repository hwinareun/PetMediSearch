const express = require("express");
const api = require("./routes")

const app = express();
const port = 8080;

app.listen(port, () => console.log(`Server listening on port ${port}!`));

// swagger 연동

const { swaggerUi, specs } = require("./swagger/swagger")
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs))


// 라우트 연결
app.use('/', api)
