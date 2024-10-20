let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("HTTP Call Failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component
function PokemonCard({ id, name, types, abilities, height, weight, cries, evolutionChains }) {
  return React.createElement(
    "div",
    {
      className:
        "max-w-xs w-full m-4 bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300",
    },
    React.createElement("img", {
      src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      alt: name,
      className: "w-full h-48 object-contain bg-gray-100 rounded-t-lg",
      loading: "lazy",
    }),
    React.createElement(
      "div",
      { className: "p-4" },
      React.createElement(
        "h2",
        { className: "text-2xl font-bold text-navy-900 mb-2" },
        name
      ),
      React.createElement(
        "p",
        { className: "text-sm text-gray-600 italic mb-1" },
        `Type: ${types.join(" / ")}`
      ),
      React.createElement(
        "p",
        { className: "text-sm text-gray-600 mb-1" },
        `Abilities: ${abilities.join(", ")}`
      ),
      React.createElement(
        "p",
        { className: "text-sm text-gray-600 mb-1" },
        `Height: ${height}`
      ),
      React.createElement(
        "p",
        { className: "text-sm text-gray-600 mb-1" },
        `Weight: ${weight}`
      ),
      React.createElement(
        "div",
        { className: "mt-4" },
        React.createElement(
          "h3",
          { className: "font-semibold text-navy-800 mb-1" },
          "Cries:"
        ),
        React.createElement(
          "audio",
          { controls: true, className: "w-full" },
          React.createElement("source", { src: cries.latest, type: "audio/ogg" }),
          "Your browser does not support the audio element."
        ),
        React.createElement(
          "audio",
          { controls: true, className: "w-full mt-1" },
          React.createElement("source", { src: cries.legacy, type: "audio/ogg" }),
          "Your browser does not support the audio element."
        )
      ),
      React.createElement(
        "div",
        { className: "mt-4" },
        React.createElement(
          "h3",
          { className: "font-semibold text-navy-800 mb-1" },
          "Evolution Chain:"
        ),
        React.createElement(
          "p",
          { className: "text-sm text-gray-600" },
          evolutionChains.join(" → ")
        )
      )
    )
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-gray-400 mt-8" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    {
      className:
        "container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
    },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        abilities: pokemon.abilities,
        height: pokemon.height,
        weight: pokemon.weight,
        cries: pokemon.cries,
        evolutionChains: pokemon.evolutionChains,
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "min-h-screen bg-gradient-to-b from-blue-100 to-blue-200" },
    React.createElement(
      "header",
      {
        className:
          "bg-blue-600 py-4 text-center text-white shadow-md mb-8",
      },
      React.createElement(
        "h1",
        { className: "text-4xl font-extrabold tracking-widest" },
        "Pokedex"
      ),
      React.createElement(
        "p",
        { className: "text-lg mt-2 font-light" },
        "Explore all your favorite Pokémon in one place"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();