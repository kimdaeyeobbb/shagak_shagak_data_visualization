import { useEffect } from "react";
import useVectorMap from "../../hooks/useVectorMap";
import useMap from "../../hooks/useMap";
const VectorLayer = () => {
  const { createVector } = useVectorMap();
  const {
    value: { map },
  } = useMap();
  useEffect(() => {
    const vector = createVector("polyline", [
      [45.51, -122.68],
      [37.77, -122.43],
      [34.04, -118.2],
    ]);
    map.fitBounds(vector.getBounds());
  }, []);

  return <></>;
};

export default VectorLayer;
