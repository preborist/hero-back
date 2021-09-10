const express = require('express');
const router = express.Router();

const ctrl = require('../../../controllers/heroes');
const upload = require('../../../helpers/upload');

router.get('/', ctrl.getAll);

router.get('/:heroId', ctrl.getById);

router.post('/', upload.array('images', 10), ctrl.create);

router.delete('/:heroId', ctrl.remove);

router.put('/:heroId', ctrl.update);

module.exports = router;
