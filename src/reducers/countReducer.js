const COUNT_ACTIONS = {
  INCREMENT: "increment",
  RESET: "reset",
};

const countReducer = (state, action) => {
  const { type, step } = action;
  switch (type) {
    case COUNT_ACTIONS.INCREMENT: {
      return { ...state, count: state.count + step };
    }
    default: {
      throw new Error(`Unsupported action type: ${type}`);
    }
  }
};

export { COUNT_ACTIONS, countReducer };
