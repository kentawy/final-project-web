const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/authController');
const protect = require('../middleware/protect');
const validateRequest = require('../middleware/validateRequest');
const { registerSchema, loginSchema } = require('../validators/authValidator');

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

module.exports = router;