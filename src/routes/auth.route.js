const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/test', AuthController.returnTestPage);

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/claim-account', AuthController.claimAccount);
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;