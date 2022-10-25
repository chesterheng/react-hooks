import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from "../api/pokemonApi";
import { ErrorFallback } from "./Error";
import { STATUS_ACTIONS } from "../reducers/asyncReducer";

const PokemonInfo = ({ pokemonName }) => {
  const [state, setState] = useState({
    status: pokemonName ? STATUS_ACTIONS.PENDING : STATUS_ACTIONS.IDLE,
    pokemon: null,
    error: null,
  });
  const { status, pokemon, error } = state;

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setState({ ...state, status: STATUS_ACTIONS.PENDING });
    fetchPokemon(pokemonName).then(
      (pokemon) => {
        setState({ ...state, status: STATUS_ACTIONS.RESOLVED, pokemon });
      },
      (error) => {
        setState({ ...state, status: STATUS_ACTIONS.REJECTED, error });
      }
    );
  }, [pokemonName, state]);

  if (status === STATUS_ACTIONS.IDLE) {
    return "Submit a pokemon";
  } else if (status === STATUS_ACTIONS.PENDING) {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === STATUS_ACTIONS.REJECTED) {
    throw error;
  } else if (status === STATUS_ACTIONS.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />;
  }
  throw new Error("This should be impossible");
};

const PokemonWithState = () => {
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

export { PokemonWithState };
