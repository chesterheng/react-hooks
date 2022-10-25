const STATUS_ACTIONS = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const asyncReducer = (state, action) => {
  switch (action.type) {
    case STATUS_ACTIONS.PENDING: {
      return { status: STATUS_ACTIONS.PENDING, data: null, error: null };
    }
    case STATUS_ACTIONS.RESOLVED: {
      return {
        status: STATUS_ACTIONS.RESOLVED,
        data: action.data,
        error: null,
      };
    }
    case STATUS_ACTIONS.REJECTED: {
      return {
        status: STATUS_ACTIONS.REJECTED,
        data: null,
        error: action.error,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export { STATUS_ACTIONS, asyncReducer };
