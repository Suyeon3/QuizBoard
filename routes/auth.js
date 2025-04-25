const express = require('express');
const authController = require('../Controllers/authController');
const checkDupli = require('../middlewares/checkDupliMiddleware');
const router = express.Router();

router.post('/login', authController.login);
router.post('/join', authController.join);
router.post('/join/email', checkDupli.checkEmailDupli);
router.post('/join/username', checkDupli.checkUsernameDupli);

module.exports = router;