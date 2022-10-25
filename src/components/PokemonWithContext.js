import React, { useEffect, useState } from "react";
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from "../api/pokemonApi";
import { useAsync } from "../hooks/useAsync";
import {
  usePokemonCache,
  PokemonCacheProvider,
} from "../context/PokemonCacheContext";
import { POKEMON_ACTIONS } from "../reducers/pokemonCacheReducer";
import { STATUS_ACTIONS } from "../reducers/asyncReducer";

const PokemonInfo = ({ pokemonName: externalPokemonName }) => {
  const [cache, dispatch] = usePokemonCache();
  const pokemonName = externalPokemonName?.toLowerCase();
  const {
    data: pokemon,
    error,
    status,
    run,
    setData,
  } = useAsync({
    status: pokemonName ? STATUS_ACTIONS.PENDING : STATUS_ACTIONS.IDLE,
  });

  useEffect(() => {
    if (!pokemonName) {
      return;
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName]);
    } else {
      run(
        fetchPokemon(pokemonName).then((pokemonData) => {
          dispatch({
            type: POKEMON_ACTIONS.ADD_POKEMON,
            pokemonName,
            pokemonData,
          });
          return pokemonData;
        })
      );
    }
  }, [cache, dispatch, pokemonName, run, setData]);

  switch (status) {
    case STATUS_ACTIONS.IDLE:
      return <span>Submit a pokemon</span>;
    case STATUS_ACTIONS.PENDING:
      return <PokemonInfoFallback name={pokemonName} />;
    case STATUS_ACTIONS.REJECTED:
      throw error;
    case STATUS_ACTIONS.RESOLVED:
      return <PokemonDataView pokemon={pokemon} />;
    default:
      throw new Error("This should be impossible");
  }
};

const PreviousPokemon = ({ onSelect }) => {
  const [cache] = usePokemonCache();
  return (
    <div>
      Previous Pokemon
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {Object.keys(cache).map((pokemonName) => (
          <li key={pokemonName} style={{ margin: "4px auto" }}>
            <button
              style={{ width: "100%" }}
              onClick={() => onSelect(pokemonName)}>
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PokemonSection = ({ onSelect, pokemonName }) => {
  return (
    <PokemonCacheProvider>
      <div style={{ display: "flex" }}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info">
          <PokemonErrorBoundary
            onReset={() => onSelect("")}
            resetKeys={[pokemonName]}>
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
        </div>
      </div>
    </PokemonCacheProvider>
  );
};

const PokemonWithContext = () => {
  const [pokemonName, setPokemonName] = useState("");

  const handleSubmit = (newPokemonName) => {
    setPokemonName(newPokemonName);
  };

  const handleSelect = (newPokemonName) => {
    setPokemonName(newPokemonName);
  };

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  );
};

export { PokemonWithContext };
