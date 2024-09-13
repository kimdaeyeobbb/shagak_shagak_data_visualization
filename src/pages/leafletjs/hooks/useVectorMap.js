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

  const [vectors, setVectors] = useState([]);

  const findVector = (vectorId) =>
    vectors.filter(({ vector }) => vector.options.id === vectorId)[0];
  const isIncludeVector = (vectorId) =>
    !vectors.every(({ vector }) => vector.options.id !== vectorId);
  const exceptVectors = (vectorId) =>
    vectors.filter(({ vector }) => vector.options.id !== vectorId);

  const createVector = (shape, data, options = { id: Date.now() }) => {
    const newVector = { shape, vector: L[shape](data, options) };
    setVectors((prev) => [...prev, newVector]);
    return newVector;
  };

  const drawVector = ({ vector: target }) => {
    if (!target) return;
    target.addTo(map);
  };

  const updateVector = ({ vector: newVector }, position) => {
    const id = newVector.options.id;
    const targetVector = findVector(id);
    targetVector.vector = newVector;
    targetVector.vector.addLatLng(...position);
    const otherVectors = exceptVectors(id);

    setVectors([...otherVectors, targetVector]);

    return targetVector;
  };

  const removeVector = ({ vector: target }) => {
    if (!target) return;
    setVectors(exceptVectors(target.options.id));
    target.remove();
  };

  const updateVectorStyle = (target, options) => {
    if (target) {
      target.setStyle(options);
    }
  };
  const zoomCurrentVector = (vectors) => {
    // 지도의 뷰를 벡터의 범위에 맞게 조정
    const bounds = L.latLngBounds(vectors.vector.getLatLngs());
    map.fitBounds(bounds);
  };
  const useVectorEvent = (event, callback, dependencies = []) => {
    useEffect(() => {
      if (!vectors.length) return;
      vectors.forEach(({ vector }) => vector.on(event, callback));
      return () => {
        vectors.forEach(({ vector }) => vector.off(event, callback));
      };
    }, [callback, event, ...dependencies]);
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
