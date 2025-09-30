const express = require('express');
const router = express.Router();
const ctrl = require('./posts.controller');
const auth = require('../../middleware/auth.middleware');

router.get('/', ctrl.list);
router.get('/:slug', ctrl.getBySlug);
router.post('/', auth, ctrl.create);
router.put('/:id', auth, ctrl.update);
router.delete('/:id', auth, ctrl.remove);

module.exports = router;
