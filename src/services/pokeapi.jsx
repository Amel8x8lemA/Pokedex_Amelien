import axios from 'axios'

export async function getPokemonsinPokeAPI() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
    return response.data.results
}

export async function getPokemonDetails(name) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return response.data
}