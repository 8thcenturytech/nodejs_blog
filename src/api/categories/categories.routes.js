const express = require('express');
const router = express.Router();
const ctrl = require('./categories.controller');
const auth = require('../../middleware/auth.middleware');

router.get('/', ctrl.list);
router.post('/', auth, ctrl.create);
router.delete('/:id', auth, ctrl.remove);
router.put('/:id', auth, ctrl.update);

module.exports = router;
