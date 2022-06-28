
const axios = require('axios');
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

const getPokemons = async () => {
    const response = await axios.get(API_URL);
    return response.data.results.map(pokemon => {
        return {
            name: pokemon.name,
            number: pokemon.url.split('/').slice(-2)[0]
        }
    }
    );
}

module.exports = {
    getPokemons
}