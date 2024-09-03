import * as L from "leaflet";
import useMap from "./useMap";

// const vector = {
//   path,
//   polyline,
//   polygon,
//   rectangle,
//   circle,
//   circleMarker,
//   svg,
//   canvas,
// };

const useVectorMap = () => {
  const { value } = useMap();
  const { map } = value;
  const createVector = (shape, data, options = {}) => {
    const vector = L[shape](data, options).addTo(map);
    return vector;
  };

  const drawVector = () => {
    //.addTo(map)
  };

  const removeVector = () => {};

  return {
    createVector,
    drawVector,
    removeVector,
  };
};

export default useVectorMap;
