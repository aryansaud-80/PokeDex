'use strict';

const cardEl = document.getElementById('cards');
const filterInput = document.getElementById('filter_input');
const errorMessage = document.getElementById('error');

let pokemonData = [];
let html = '';
const maxPokemon = 1025;

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

async function fetchPokemonData() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}&offset=0`);
    const data = await response.json();
    pokemonData = data.results;
    await addPokemonTypes(pokemonData);
    displayPokemon(pokemonData);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    errorMessage.style.display = "block";
    cardEl.style.display = "none";
  }
}

async function addPokemonTypes(pokemonList) {
  const promises = pokemonList.map(async (pokemon) => {
    try {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      pokemon.types = data.types.map(typeInfo => typeInfo.type.name);
    } catch (error) {
      console.error(`Error fetching types for ${pokemon.name}:`, error);
      pokemon.types = [];
    }
  });

  await Promise.all(promises);
}

function displayPokemon(data) {
  html = '';
  cardEl.style.display = "";
  errorMessage.style.display = 'none';
  data.forEach(el => {
    const pokemonId = el.url.split('/')[6];
    const type = el.types[0] || 'normal'; 
    const color = typeColors[type.toLowerCase()] || '#f9f9f9'; 
    html += `
      <div class="card" style="background-color: ${color};" data-id = "${pokemonId}">
        <p class="id">#${pokemonId.padStart(3,'0')}</p>
        <div class="img">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png" alt="${el.name}">
        </div>
        <h3 class="name">
          ${el.name}
        </h3>
      </div>`;
  });

  if (html === '') {
    errorMessage.style.display = 'block';
    cardEl.style.display = "none";
  }

  cardEl.innerHTML = html;
}

async function displayPokemonDetails(pokemonId) {
  window.location.href = `./details.html?id=${pokemonId}`;
  return true;
}

cardEl.addEventListener('click', async (event) => {
  const card = event.target.closest('.card');
  console.log(card);
  if (card) {
    const pokemonId = card.dataset.id;
    let success = await displayPokemonDetails(pokemonId);
    if (success) {
      window.location.href = `./details.html?id=${pokemonId}`;
    }
  }
});

filterInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
  displayPokemon(filteredData);
});

fetchPokemonData();
filterInput.value = "";
