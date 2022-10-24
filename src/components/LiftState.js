import React from "react";

const Name = ({ name, onNameChange }) => {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  );
};

const FavoriteAnimal = ({ animal, onAnimalChange }) => {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  );
};

const Display = ({ animal }) => {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
};

const LiftState = () => {
  const [animal, setAnimal] = React.useState("");
  const [name, setName] = React.useState("");
  return (
    <form>
      <Name name={name} onNameChange={(event) => setName(event.target.value)} />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={(event) => setAnimal(event.target.value)}
      />
      <Display animal={animal} />
    </form>
  );
};

export { LiftState };
