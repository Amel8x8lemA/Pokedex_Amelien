export const getPokemonName = async (pokemonNumber) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error("Error fetching Pokemon name:", error);
        return null;
    }
};

export const getPokemonImageUrl = (pokemonNumber) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`;
};

export const getPokemonNumberByName = async (pokemonName) => {
    try {
        console.log("Fetching Pokemon:", pokemonName);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        
        const data = await response.json();
        console.log(data.id);
        return data.id;
    } catch (error) {
        console.error("Error fetching Pokemon number:", error);
        return null;
    }
};
