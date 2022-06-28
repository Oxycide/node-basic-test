const express = require('express');
const router = express.Router();
const pokes = require('../controllers/pokemon');

router.get('/pokes', (req, res) => {
    pokes.getPokemons().then(pokemons => {
        res.json(pokemons);
    });
});
router.post('/pokes')

module.exports = router;