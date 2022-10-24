import React from "react";

const Name = () => {
  const [name, setName] = React.useState("");
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
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

const ColocateState = () => {
  const [animal, setAnimal] = React.useState("");
  return (
    <form>
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={(event) => setAnimal(event.target.value)}
      />
      <Display animal={animal} />
    </form>
  );
};

export { ColocateState };
