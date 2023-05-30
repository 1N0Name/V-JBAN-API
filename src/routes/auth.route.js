const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/test', AuthController.returnTestPage);

router.get('/login', AuthController.getLoginPage);
router.post('/login', AuthController.login);
router.get('/register', AuthController.getRegisterPage);
router.post('/register', AuthController.register);
router.get('/claim-account', AuthController.claimAccount);
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;