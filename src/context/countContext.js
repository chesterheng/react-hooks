import { createContext, useState, useContext } from "react";

const CountContext = createContext();
CountContext.displayName = "CountContext";
const { Provider } = CountContext;

const CountProvider = ({ children }) => {
  const [count, SetCount] = useState(0);
  const value = [count, SetCount];
  return <Provider value={value}>{children}</Provider>;
};

// consumer hook
const useCount = () => {
  const countContext = useContext(CountContext);
  if (countContext === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return countContext;
};

export { CountProvider, useCount };
