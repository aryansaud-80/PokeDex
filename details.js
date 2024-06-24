const detailContainer = document.getElementById('details');

const pokemonId = new URLSearchParams(window.location.search).get('id');


async function getPokemonData(id){
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await promise.json();
  displayPokemonDetails(data);
}



const displayPokemonDetails = (data)=>{
  let html ="";
  detailContainer.innerHTML = "";
  html += `<div class="intro">
      <div class="nameId">
        <p class="name">${data.name}</p>
        <p class="id">#${pokemonId.padStart(3,'0')}</p>
      </div>
      <div class="img-container">
        <img src="${data.sprites.front_default}" alt="" class="pokeImg">
      </div>
    </div>

    <div class="types">
      <h1>Types</h1>
      <div class="type">
        <p style="--color: #ccffcc">${data.types[0].type.name}</p>
      </div>
    </div>

    <div class="about">
      <h2>About</h2>
      <div class="about_data"> 
        <div class="detail">
          <p><i class="ri-weight-line"></i> ${data.weight/10}kg</p>
          <p>weight</p>
        </div>
        <div class="detail">
            <p><i class="ri-expand-height-line"></i> ${data.height/10}m</p>
          <p>Height</p>
        </div>
        <div class="detail">
          <p>${data.moves[0].move.name}</p>
          <p>Moves</p>
        </div>
      </div>
    </div>`


    detailContainer.innerHTML = html;
}

getPokemonData(pokemonId);