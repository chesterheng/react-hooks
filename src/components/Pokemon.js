import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  STATUS,
} from "../api/pokemonApi";
import { ErrorFallback } from "./Error";

const PokemonInfo = ({ pokemonName }) => {
  const [state, setState] = useState({
    status: pokemonName ? STATUS.PENDING : STATUS.IDLE,
    pokemon: null,
    error: null,
  });
  const { status, pokemon, error } = state;

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setState({ ...state, status: STATUS.PENDING });
    fetchPokemon(pokemonName).then(
      (pokemon) => {
        setState({ ...state, status: STATUS.RESOLVED, pokemon });
      },
      (error) => {
        setState({ ...state, status: STATUS.REJECTED, error });
      }
    );
  }, [pokemonName]);

  if (status === STATUS.IDLE) {
    return "Submit a pokemon";
  } else if (status === STATUS.PENDING) {
    return <PokemonInfoFallback name={pokemonName} />;
  } else if (status === STATUS.REJECTED) {
    throw error;
  } else if (status === STATUS.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />;
  }
  throw new Error("This should be impossible");
};

const Pokemon = () => {
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

export { Pokemon };
