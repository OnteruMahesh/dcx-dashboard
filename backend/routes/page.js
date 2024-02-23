const express = require('express');
const router = express.Router();
const { check } = require('../middleware/auth');

const pageController = require('../controllers/page.controller');

router.post('/',pageController.addPage)

router.get('/',pageController.getPages)

router.get('/:pid',pageController.getSinglePage)

router.get('/category/:cid',pageController.getPageByCategory);

router.post('/:pid',pageController.updatePage);

router.post('/delete',pageController.deletePages);

module.exports = router;