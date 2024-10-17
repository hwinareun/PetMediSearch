require('dotenv').config();
const express = require("express");
const nodePath = require("path");
const cors = require("cors");

const app = express();
const port = 8080;

console.log('Current directory:', __dirname);

// 미들웨어 설정
app.use(cors({ origin: "https://pet-medi-search.vercel.app", credentials: true }));
app.use(express.json());

// swagger 연동
const { swaggerUi, specs } = require("./swagger/swagger");
app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static("public"));

app.get("/search", (req, res) => {
  res.sendFile(nodePath.join(__dirname, "public", "search.html"));
});

// 라우터 설정
const categoryRouter = require('./routes/category');
const postRouter = require('./routes/post');
const reviewRouter = require('./routes/review');
const commentRouter = require('./routes/comment');
const authRouter = require('./routes/auth');
const facilitiesRouter = require('./routes/facilities');  // 새로 추가
const mypageRouter = require('./routes/mypage')

app.use('/category', categoryRouter);
app.use('/posts', postRouter);
app.use('/reviews', reviewRouter);
app.use('/comments', commentRouter);
app.use('/auth', authRouter);
app.use('/facilities', facilitiesRouter);  // 새로 추가
app.use('/mypage', mypageRouter);

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});