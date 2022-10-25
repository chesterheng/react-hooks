import { useReducer } from "react";
import { nameReducer, initialNameValue } from "../reducers/nameReducer";

const NameInput = () => {
  const [name, setName] = useReducer(nameReducer, initialNameValue);
  const handleChange = (event) => setName(event.target.value);

  return (
    <>
      <label>
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You typed: {name}</div>
    </>
  );
};

export { NameInput };
