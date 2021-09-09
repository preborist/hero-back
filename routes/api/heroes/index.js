const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/heroes');

const { schemaCreateHero, schemaUpdateHero } = require('./validation');

router.get('/', ctrl.getAll);

router.get('/:heroId', ctrl.getById);

router.post('/', ctrl.create);

router.delete('/:heroId', ctrl.remove);

router.put('/:heroId', ctrl.update);

module.exports = router;
