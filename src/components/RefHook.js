import { useState, useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

const NoReRender = () => {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current++;
  };

  return (
    <>
      <h1>Does Not Cause Re-renders</h1>
      <h2>Render Count: {countRef.current}</h2>
      <button onClick={handleClick}>Click me</button>
    </>
  );
};

const Stopwatch = () => {
  const timerIdRef = useRef(0);
  const [count, setCount] = useState(0);

  const startHandler = () => {
    if (timerIdRef.current) return;
    timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
  };

  const stopHandler = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = 0;
  };

  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);

  return (
    <div>
      <div>Timer: {count}s</div>
      <div>
        <button onClick={startHandler}>Start</button>
        <button onClick={stopHandler}>Stop</button>
      </div>
    </div>
  );
};

const AccessDomElement = () => {
  const inputElementRef = useRef();

  const focusInput = () => {
    inputElementRef.current.focus();
  };
  return (
    <>
      <input type="text" ref={inputElementRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
};

const Tilt = ({ children }) => {
  const tiltRef = useRef();

  useEffect(() => {
    const { current: tiltNode } = tiltRef;
    const vanillaTiltOptions = {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    };
    VanillaTilt.init(tiltNode, vanillaTiltOptions);
    return () => tiltNode.vanillaTilt.destroy();
  }, []);

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  );
};

const TrackStateChange = () => {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  );
};

const RefHook = () => (
  <>
    <NoReRender />
    <hr />
    <Stopwatch />
    <hr />
    <AccessDomElement />
    <hr />
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
    <hr />
    <TrackStateChange />
  </>
);

export { RefHook };
