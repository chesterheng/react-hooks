import { useMedia } from "../hooks/useMedia";

const Box = () => {
  const isBig = useMedia("(min-width: 1000px)");
  const isMedium = useMedia("(max-width: 999px) and (min-width: 700px)");
  const isSmall = useMedia("(max-width: 699px)");
  const color = isBig ? "green" : isMedium ? "yellow" : isSmall ? "red" : null;

  return <div style={{ width: 200, height: 200, backgroundColor: color }} />;
};

export { Box };
