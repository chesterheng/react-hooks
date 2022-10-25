import { useState } from "react";

const CounterWithState = ({ initialCount = 0, step = 1 }) => {
  const [count, setCount] = useState(initialCount);

  const reset = () => setCount(initialCount);
  const decrement = () => setCount((prevCount) => prevCount - step);
  const increment = () => setCount((prevCount) => prevCount + step);

  return (
    <>
      Count: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </>
  );
};

export { CounterWithState };
