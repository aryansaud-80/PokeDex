const pokemonId = new URLSearchParams(window.location.search).get('id');

const introEl = document.querySelector('.intro');

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



async function getPokemonData(id){
  const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await promise.json();
  displayPokemonDetails(data);
}

const generateTypeColor = function(type){
  let color = '';
  if(typeColors.hasOwnProperty(type)){
    color = typeColors[type];
  }else{
    color = typeColors[normal];
  }


  return color;
}



const displayPokemonDetails = (data)=>{
  const types = data.types;
  const moves = data.moves;
  let count =0;
  introEl.style.backgroundColor = generateTypeColor(data.types[0].type.name);
  document.querySelector('.name').innerText = data.name;
  document.querySelector('.id').innerText = `#${pokemonId.padStart(3, '0')}`;
  document.querySelector('.pokeImg').src= `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
  

  types.forEach((el)=>{
    const pEl = document.createElement('p');
    pEl.innerText = el.type.name;
    pEl.setAttribute("style", `--color: ${generateTypeColor(el.type.name)}`)
    document.querySelector('.type-data').insertAdjacentElement('beforeend', pEl)
  })

  document.querySelector('.weight').insertAdjacentText('beforeend', `${data.weight/10}kg`);
  document.querySelector('.height').insertAdjacentText('beforeend', `${data.height/10}m`);


  moves.forEach((el)=>{
    count++;
    if(count>2) return;

    const pEl = document.createElement('p');
    pEl.innerText = el.move.name;
    document.querySelector('.moves').insertAdjacentElement('afterbegin', pEl);
  })
}

getPokemonData(pokemonId);