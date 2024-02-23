const express = require('express');
 const router = express.Router();
const { check } = require('../middleware/auth');

const categoryController = require('../controllers/category.controller');

 router.post('/',categoryController.addCategory);

router.get('/',categoryController.getCategory);

 router.get('/:cid',categoryController.getSingleCategory);

 router.post('/update/:cid',categoryController.updateCategory);

 router.post('/delete',categoryController.deleteCategories);

 module.exports = router;