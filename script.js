const searchButton = document.getElementById('searchButton');
const pokemonNameInput = document.getElementById('pokemonName');
const pokemonDataDiv = document.getElementById('pokemonData');

const fetchPokemon = async () => {
    const query = pokemonNameInput.value.toLowerCase().trim();
    if (!query) {
        displayError('Please enter a Pokémon name or ID.');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
            throw new Error('Pokémon not found.');
        }
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        displayError(error.message);
    }
};

const displayPokemon = (data) => {
    const { name, id, sprites, types, abilities } = data;
    const image = sprites.front_default || '';
    const typeElements = types.map(typeInfo => `<span class="type">${typeInfo.type.name}</span>`).join('');
    const abilityElements = abilities.map(abilityInfo => `<li>${abilityInfo.ability.name}</li>`).join('');

    pokemonDataDiv.innerHTML = `
        <img src="${image}" alt="${name}">
        <h2>${name} (#${id})</h2>
        <div class="info"><strong>Type:</strong> ${typeElements}</div>
        <div class="info"><strong>Abilities:</strong> <ul>${abilityElements}</ul></div>
    `;
};

const displayError = (message) => {
    pokemonDataDiv.innerHTML = `<p class="error">${message}</p>`;
};

searchButton.addEventListener('click', fetchPokemon);

// Allow pressing "Enter" to search
pokemonNameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        fetchPokemon();
    }
});
