const express = require('express');
const Books = require('./../controllers/books');

const router = express.Router();

router.get("/", Books.list);
router.get("/categories", Books.getCategories);



module.exports = router;