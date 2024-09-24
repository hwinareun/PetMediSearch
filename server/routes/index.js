const express = require('express');
const router = express.Router();

const categoryRouter = require('./category');
const postRouter = require('./post');

router.use('/category', categoryRouter);
router.use('/posts', postRouter);

module.exports = router;
