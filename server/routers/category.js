const express = require('express')
const { getListByCategory } = require('../controller/category')
const router = express.Router()

router.get('/', getListByCategory)

module.exports = router;