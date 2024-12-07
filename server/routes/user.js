const express = require('express');
const router = express.Router();
const { login, signup, Updateuser} = require('../controllers/user');
const { verifyToken } = require('../middlewares/verifyToken');


router.post('/login', login());
router.post('/signup', signup());
router.put('/update/:id',verifyToken, Updateuser());

module.exports = router;