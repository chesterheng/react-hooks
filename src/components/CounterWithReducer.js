import { useReducer } from "react";
import { countReducer, COUNT_ACTIONS } from "../reducers/countReducer";

const CounterWithReducer = ({ initialCount = 0, step = 1 }) => {
  const [state, dispatch] = useReducer(countReducer, {
    count: initialCount,
  });
  const { count } = state;
  const increment = () => dispatch({ type: COUNT_ACTIONS.INCREMENT, step });

  return <button onClick={increment}>{count}</button>;
};

export { CounterWithReducer };
