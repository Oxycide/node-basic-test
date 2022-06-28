const express = require('express');
const router = express.Router();
const pokes = require('../controllers/pokemon');

router.get('/pokes', pokes.getPokemons);
router.post('/pokes', pokes.savePokemon);

module.exports = router;