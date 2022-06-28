const axios = require('axios');
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10';
const Random = require('meteor-random');
const fs = require('fs');
const {json} = require("express");

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
    let pokemon = fetchFirstPokemon.data;
    let pokemonData = [{
        id: pokemonId,
        name: pokemon.name,
        height: pokemon.height,
        order: pokemon.order
    }]
    let firstPokemon = JSON.stringify(pokemonData);


    try {
        if(fs.existsSync('./public/new_pokes.json')) {
            let pokes = JSON.parse(fs.readFileSync('./public/new_pokes.json'));
            console.log(pokes.length);
            let length = pokes.length;
            let newPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${length++}`);
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



module.exports = {
    getPokemons,
    savePokemon
}