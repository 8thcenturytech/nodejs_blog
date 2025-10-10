const express = require('express');
const router = express.Router();
const ctrl = require('./posts.controller');
const auth = require('../../middleware/auth.middleware');
const { upload } = require('../../../config/cloudinary');

// 🧩 Public routes
router.get('/', ctrl.list);
router.get('/:slug', ctrl.getBySlug);

// 🧩 Auth-protected routes
router.post('/', auth, upload.single('image'), ctrl.create);
router.put('/:id', auth, upload.single('image'), ctrl.update);
router.delete('/:id', auth, ctrl.remove);

// 🆕 Increment view count (no auth required)
router.post('/:id/view', ctrl.incrementView);

module.exports = router;
