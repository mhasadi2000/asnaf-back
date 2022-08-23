
const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/', authController.signUpUser);
router.post('/verify', authController.verifyOtp);

module.exports = router;