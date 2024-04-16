import { getPokemonsInCurrentUserInUsers, setPokemonInCurrentUserInUsers, setPokemonsInCurrentUserInUsers } from "./users"

export const addPokemonInPokedex = (pokemon) => {
    setPokemonInCurrentUserInUsers(pokemon)
}

export const getPokemonsFromLocalStorage = () => {
    const pokemons = localStorage.getItem('pokemons')
    return pokemons ? JSON.parse(pokemons) : []
}

export const getPokemonsInPokedex = () => {
    return getPokemonsInCurrentUserInUsers()
}

export const removePokemonFromPokedex = (pokemon) => {
    const pokemons = getPokemonsInPokedex()
    const index = pokemons.findIndex((p) => p.name === pokemon.name)
    pokemons.splice(index,1)
    setPokemonsInCurrentUserInUsers(pokemons)
}

export const isInPokemonsInPokedex = (pokemon) => {
    const pokemons = getPokemonsInPokedex()
    return pokemons.find((p) => p.name === pokemon.name)
}

export const getPokemonImage = (pokemon) => {
    const id = pokemon?.id ||  pokemon?.url?.split('/')[6]
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    return url
}


