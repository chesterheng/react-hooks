import React, { useEffect } from "react";

const Child = () => {
  console.log("%c    Child: render start", "color: MediumSpringGreen");

  const [count, setCount] = React.useState(() => {
    console.log("%c    Child: useState(() => 0)", "color: tomato");
    return 0;
  });

  useEffect(() => {
    console.log("%c    Child: useEffect(() => {})", "color: LightCoral");
    return () => {
      console.log(
        "%c    Child: useEffect(() => {}) cleanup 🧹",
        "color: LightCoral"
      );
    };
  });

  useEffect(() => {
    console.log(
      "%c    Child: useEffect(() => {}, [])",
      "color: MediumTurquoise"
    );
    return () => {
      console.log(
        "%c    Child: useEffect(() => {}, []) cleanup 🧹",
        "color: MediumTurquoise"
      );
    };
  }, []);

  useEffect(() => {
    console.log("%c    Child: useEffect(() => {}, [count])", "color: HotPink");
    return () => {
      console.log(
        "%c    Child: useEffect(() => {}, [count]) cleanup 🧹",
        "color: HotPink"
      );
    };
  }, [count]);

  const element = (
    <button onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  );

  console.log("%c    Child: render end", "color: MediumSpringGreen");

  return element;
};

const HookFlow = () => {
  console.log("%cHookFlow: render start", "color: MediumSpringGreen");

  const [showChild, setShowChild] = React.useState(() => {
    console.log("%cHookFlow: useState(() => false)", "color: tomato");
    return false;
  });

  useEffect(() => {
    console.log("%cHookFlow: useEffect(() => {})", "color: LightCoral");
    return () => {
      console.log(
        "%cHookFlow: useEffect(() => {}) cleanup 🧹",
        "color: LightCoral"
      );
    };
  });

  useEffect(() => {
    console.log(
      "%cHookFlow: useEffect(() => {}, [])",
      "color: MediumTurquoise"
    );
    return () => {
      console.log(
        "%cHookFlow: useEffect(() => {}, []) cleanup 🧹",
        "color: MediumTurquoise"
      );
    };
  }, []);

  useEffect(() => {
    console.log(
      "%cHookFlow: useEffect(() => {}, [showChild])",
      "color: HotPink"
    );
    return () => {
      console.log(
        "%cHookFlow: useEffect(() => {}, [showChild]) cleanup 🧹",
        "color: HotPink"
      );
    };
  }, [showChild]);

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={(e) => setShowChild(e.target.checked)}
        />{" "}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 50,
          border: "solid",
        }}>
        {showChild ? <Child /> : null}
      </div>
    </>
  );

  console.log("%cHookFlow: render end", "color: MediumSpringGreen");

  return element;
};

export { HookFlow };
