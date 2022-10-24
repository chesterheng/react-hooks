const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const previousValueRef = useRef();
  // Store current value in ref
  useEffect(() => {
    previousValueRef.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return previousValueRef.current;
};
