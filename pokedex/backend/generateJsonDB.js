const fs = require("fs");
const axios = require('axios').default

async function generateJsonDB() {
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";

  try {
    const response = await axios.get(pokemonApiURL);
    const pokemonList = response.data.results;

    const database = { pokemon: [] };

    for (const pokemon of pokemonList) {
      const detail = await fetchPokemonDetail(pokemon.url);
      database.pokemon.push(detail);
    }

    fs.writeFileSync("db.json", JSON.stringify(database, null, 4));
    console.log("Database berhasil dibuat!");
  } catch (error) {
    console.error("Gagal generate JSON DB:", error);
  }
}

async function fetchPokemonDetail(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      id: data.id,
      name: data.name,
      types: data.types.map((type) => type.type.name),
      abilities: data.abilities.map((ability) => ability.ability.name),
      height: data.height,
      weight: data.weight,
      cries: {
        latest: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg`,
        legacy: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${data.id}.ogg`,
      },
      evolutionChains: [data.name], // Dummy value karena data evolusi perlu fetch lagi dari API evolusi
    };
  } catch (error) {
    console.error(`Gagal fetch detail untuk ${url}:`, error);
    return null;
  }
}

generateJsonDB(); 