import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from "../api/pokemonApi";
import { ErrorFallback } from "./Error";
import { useAsync } from "../hooks/useAsync";
import { STATUS_ACTIONS } from "../reducers/asyncReducer";

const PokemonInfo = ({ pokemonName }) => {
  const {
    data: pokemon,
    error,
    status,
    run,
  } = useAsync({
    status: pokemonName ? STATUS_ACTIONS.PENDING : STATUS_ACTIONS.IDLE,
  });

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    run(fetchPokemon(pokemonName));
  }, [pokemonName, run]);

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

const PokemonWithReducer = () => {
  const [pokemonName, setPokemonName] = useState("");

  const handleSubmit = (newPokemonName) => {
    setPokemonName(newPokemonName);
  };

  const handleReset = () => {
    setPokemonName("");
  };

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleReset}
          resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export { PokemonWithReducer };
