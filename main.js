
'use strict';

const cardEl = document.getElementById('cards');
const filterInput = document.getElementById('filter_input');

let pokemonData = []; 
let html = ''; 
const maxPokemon = 1025;

async function fetchPokemonData() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}&offset=0`); 
    const data = await response.json();
    pokemonData = data.results;
    displayPokemon(pokemonData);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}

function displayPokemon(data) {
  html = ''; 
  data.forEach(el => {
    const pokemonId = el.url.split('/')[6];
    html += ` 
      <div class="card">
        <p class="id">#${pokemonId}</p>
        <div class="img">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${el.name}">
        </div>
        <h3 class="name">
          ${el.name}
        </h3>
      </div>`;
  });
  cardEl.innerHTML = html; 
}

filterInput.addEventListener('keydown', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
  displayPokemon(filteredData); 
});

fetchPokemonData();