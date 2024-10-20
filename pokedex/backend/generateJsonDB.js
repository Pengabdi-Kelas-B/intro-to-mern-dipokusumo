const fs = require("fs");
const axios = require('axios').default

async function generateJsonDB() {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";

  const response = await axios.get(pokemonApiURL)
  console.log(response.data.results);

  const database = {
    "pokemon": []
  }

  database.pokemon = response.data.results

  fs.writeFileSync('db.json', JSON.stringify(database, null, 4))
}

generateJsonDB(); 