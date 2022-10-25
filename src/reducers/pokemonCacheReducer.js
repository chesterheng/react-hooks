const POKEMON_ACTIONS = {
  ADD_POKEMON: "ADD_POKEMON",
};

const pokemonCacheReducer = (state, action) => {
  switch (action.type) {
    case POKEMON_ACTIONS.ADD_POKEMON: {
      return { ...state, [action.pokemonName]: action.pokemonData };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export { POKEMON_ACTIONS, pokemonCacheReducer };
