import * as L from "leaflet";
import useMap from "./useMap";
import { useEffect, useState } from "react";

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

  const [vector, setVector] = useState(null);
  const [vectors, setVectors] = useState([]);

  const findVector = (vectorId) =>
    vectors.filter((vec) => vec.id === vectorId)[0];
  const isIncludeVector = (vectorId) =>
    !vectors.every((vec) => vec.id !== vectorId);
  const exceptVectors = (vectorId) =>
    vectors.filter((vec) => vec.id !== vectorId);

  const createVector = (shape, data, options = {}) => {
    const id = Date.now();
    const newVector = { id, vector: L[shape](data, options) };

    setVector(newVector.vector);
    setVectors((prev) => [...prev, { id, vector: newVector }]);
    return newVector;
  };

  const drawVector = ({ id: _, vector: target }) => {
    if (!target) return;
    target.addTo(map);
  };

  const updateVector = ({ id, vector: newVector }) => {
    const targetVector = findVector(id);
    targetVector.vector = newVector;
    const otherVectors = exceptVectors(id);

    setVector(targetVector.vector);
    setVectors([...otherVectors, targetVector]);

    return targetVector;
  };

  const removeVector = ({ id, vector: target }) => {
    if (!target) return;
    const otherVectors = exceptVectors(id);
    setVectors([...otherVectors]);
    target.remove();
  };

  const updateVectorStyle = (target, options) => {
    if (target) {
      target.setStyle(options);
    }
  };
  const zoomCurrentVector = (vectors) => {
    // 지도의 뷰를 벡터의 범위에 맞게 조정
    const bounds = L.latLngBounds(
      vectors.flatMap((vec) => vec.vector.getLatLngs())
    );
    map.fitBounds(bounds);
  };

  const useVectorEvent = (event, callback, array = []) => {
    useEffect(() => {
      if (!vector) return;
      vector.on(event, callback);
      return () => {
        vector.off(event, callback);
      };
    }, [value, vector, ...array]);
  };

  return {
    createVector,
    updateVector,
    drawVector,
    removeVector,
    isIncludeVector,
    updateVectorStyle,
    zoomCurrentVector,
    useVectorEvent,
  };
};

export default useVectorMap;
