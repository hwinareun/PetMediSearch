const express = require("express");
const api = require("./routes")

const app = express();
const port = 8080;

app.listen(port, () => console.log(`Server listening on port ${port}!`));

// swagger 연동

const { swaggerUi, specs } = require("./swagger/swagger")
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs))


app.get('/main', (req, res) => {
    res.json({ message: 'Hello, world!' });
});


// router
const categoryRouter = require('./routes/category')
const postRouter = require('./routes/post')

// category
app.use('/category', categoryRouter)
app.use('/posts', postRouter)
