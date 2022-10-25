import { useRef, useEffect, useCallback } from "react";

const useSafeDispatch = (dispatch) => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(
    (...args) => {
      if (mountedRef.current) {
        dispatch(...args);
      }
    },
    [dispatch]
  );
};

export { useSafeDispatch };
