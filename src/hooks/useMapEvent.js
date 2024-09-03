import { useEffect } from "react";
import useMap from "./useMap";

const useMapEvent = (event, callback, array) => {
  const { value } = useMap();

  const { map } = value;

  useEffect(() => {
    map.on(event, callback);
    return () => {
      map.off(event);
    };
  }, [value, ...array]);

  return map;
};

export default useMapEvent;
