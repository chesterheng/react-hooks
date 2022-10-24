import { useLocalStorageState } from "../hooks/useLocalStorageState";

const Greeting = ({ initialName = "" }) => {
  const [name, setName] = useLocalStorageState("name", initialName);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
};

export { Greeting };
