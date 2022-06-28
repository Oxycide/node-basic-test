const axios = require('axios');
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10';
const Random = require('meteor-random');
const fs = require('fs');

const getPokemons = async (req, res) => {
const response = await axios.get(API_URL);
    let pokeList = response.data.results.map( pokemon => {
            return {
                name: pokemon.name,
                order: pokemon.url.split('/').slice(-2)[0],
            }
        }
    );
    let totalPokemons = pokeList.length;
    let data = [pokeList, totalPokemons];
    res.json(data);
}

const savePokemon = async (req, res) => {
    let pokemonId = Random.id();
    let fetchFirstPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`);
    let pokemonData = []
    let firstPokemon = JSON.stringify(pokemonData);



    try {
        if(fs.existsSync('./public/new_pokes.json')) {
            let pokes = JSON.parse(fs.readFileSync('./public/new_pokes.json'));
            console.log(pokes);
            let lastPoke = pokes.length;
            console.log(lastPoke);
            let newPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${lastPoke+1}`);
            let newPokeData = newPoke.data;
            let newPokeDataJson = {
                id: pokemonId,
                name: newPokeData.name,
                height: newPokeData.height,
                order: newPokeData.order
            }
            pokes.push(newPokeDataJson);
            fs.writeFileSync('./public/new_pokes.json', JSON.stringify(pokes));
            res.json({
                message: newPokeData.name+' added successfully',
            });
            }

        else {
            fs.writeFileSync('./public/new_pokes.json', firstPokemon);
            res.json({
                message: 'File created',
            });
        }

    }
    catch(err) {
        console.log(err);
    }
}

const patchPokemon = async (req, res) => {
    let id = req.params.id;
    let pokes = JSON.parse(fs.readFileSync('./public/new_pokes.json'));
    console.log(pokes);
    let poke = pokes.find(pokemon => pokemon.order == id);
    req.body.name ? poke.name = req.body.name : null;
    req.body.height ? poke.height = req.body.height : null;
    req.body.order ? poke.order = req.body.order : null;
    fs.writeFileSync('./public/new_pokes.json', JSON.stringify(pokes));
    res.json({
        message: 'Pokemon updated successfully',
    });
}
const deletePokemon = async (req, res) => {
    let id = req.params.id;
    let pokes = JSON.parse(fs.readFileSync('./public/new_pokes.json'));
    let poke = pokes.find(pokemon => pokemon.order == id);
    if (poke) {
        pokes.splice(pokes.indexOf(poke), 1);
        fs.writeFileSync('./public/new_pokes.json', JSON.stringify(pokes));
        res.json({
            message: 'Pokemon deleted successfully',
        });
    }
    else {
        res.json({
            message: 'Pokemon not found',
        });
    }

}



module.exports = {
    getPokemons,
    savePokemon,
    patchPokemon,
    deletePokemon
}