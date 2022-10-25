import { CountProvider, useCount } from "../context/countContext";

const CountDisplay = () => {
  const [count] = useCount();
  return <div>{`The current count is ${count}`}</div>;
};

const Counter = () => {
  const [, setCount] = useCount();
  const increment = () => setCount((c) => c + 1);
  return <button onClick={increment}>Increment count</button>;
};

const CounterWithContext = () => {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
};

export { CounterWithContext };
