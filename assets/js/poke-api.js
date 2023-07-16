
const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
   .then((response) => response.json())
   .then(convertPokeApiDetailPokemon)
}

pokeApi.getPokemons = (offset= 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)  // início da tentativa de chamada de api com fetch (promise)
    .then((response) => response.json()) //transformando response em json
    .then((responseBody) => responseBody.results) // recebendo response de cima convertido e pegando os resultados
    .catch(error => console.error(error))
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails)
}


