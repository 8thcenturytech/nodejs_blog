const express = require('express');
const router = express.Router();
const ctrl = require('./auth.controller');
const auth = require('../../middleware/auth.middleware');


router.post('/login', ctrl.login);
// Get admin profile
// ✅ Secure route to get currently logged-in admin 
router.get('/admin/profile', auth, ctrl.getAdminProfile);




module.exports = router;
