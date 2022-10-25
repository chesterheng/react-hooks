import { useReducer, useCallback } from "react";
import { asyncReducer } from "../reducers/asyncReducer";
import { useSafeDispatch } from "../hooks/useSafeDispatch";
import { STATUS_ACTIONS } from "../reducers/asyncReducer";

const useAsync = (initialState) => {
  const [state, unsafeDispatch] = useReducer(asyncReducer, {
    status: STATUS_ACTIONS.IDLE,
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = useCallback(
    (promise) => {
      dispatch({ type: STATUS_ACTIONS.PENDING });
      promise.then(
        (data) => {
          dispatch({ type: STATUS_ACTIONS.RESOLVED, data });
        },
        (error) => {
          dispatch({ type: STATUS_ACTIONS.REJECTED, error });
        }
      );
    },
    [dispatch]
  );

  const setData = useCallback(
    (data) => dispatch({ type: STATUS_ACTIONS.RESOLVED, data }),
    [dispatch]
  );
  const setError = useCallback(
    (error) => dispatch({ type: STATUS_ACTIONS.REJECTED, error }),
    [dispatch]
  );

  return {
    setData,
    setError,
    data,
    error,
    status,
    run,
  };
};

const setData = (dispatch, data) =>
  dispatch({ type: STATUS_ACTIONS.RESOLVED, data });

const setError = (dispatch, error) =>
  dispatch({ type: STATUS_ACTIONS.RESOLVED, error });

export { useAsync, setData, setError };
