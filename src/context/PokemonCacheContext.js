import { createContext, useReducer, useContext } from "react";
import { pokemonCacheReducer } from "../reducers/pokemonCacheReducer";

const PokemonCacheContext = createContext();
PokemonCacheContext.displayName = "PokemonCacheContext";
const { Provider } = PokemonCacheContext;

const PokemonCacheProvider = ({ children }) => {
  const [cache, dispatch] = useReducer(pokemonCacheReducer, {});
  return <Provider value={[cache, dispatch]}>{children}</Provider>;
};

const usePokemonCache = () => {
  const context = useContext(PokemonCacheContext);
  if (!context) {
    throw new Error(
      "usePokemonCache must be used within a PokemonCacheProvider"
    );
  }
  return context;
};

export { PokemonCacheProvider, usePokemonCache };
