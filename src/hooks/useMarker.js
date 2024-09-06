import * as L from "leaflet";
import useMap from "./useMap";
import { useEffect, useState } from "react";

const useMarker = () => {
  const { value, dispatch } = useMap();
  const currentMarkers = [...value.marker];
  const [markers, setMarkers] = useState(currentMarkers);

  useEffect(() => {
    dispatch({
      type: "update",
      value: { ...value, marker: markers },
    });
  }, [markers]);

  const isIncludeMarker = (markerId) =>
    !currentMarkers.every((marker) => marker.id != markerId);
  const findMarker = (markerId) =>
    currentMarkers.filter((marker) => marker.id === markerId)[0];
  const exceptMarkers = (markerId) =>
    currentMarkers.filter((marker) => marker.id != markerId);

  const createMarker = (markerId, [lat, lng], options) => {
    if (isIncludeMarker(markerId)) {
      console.log("중복된 id의 마커가 있습니다.");
      return findMarker(markerId);
    }
    const newMarker = {
      id: markerId,
      marker: L.marker([lat, lng], options),
    };
    setMarkers((prev) => [...prev, newMarker]);
    return newMarker;
  };

  const updateMarker = (markerId, [lat, lng], options) => {
    const targetMarker = findMarker(markerId);
    targetMarker && targetMarker.marker.remove();
    const otherMarkers = exceptMarkers(markerId);
    setMarkers([...otherMarkers]);
    // eslint-disable-next-line no-unused-vars
    const { marker, ...rest } = targetMarker;
    const copyMarker = {
      ...rest,
      marker: L.marker([lat, lng], options),
    };
    setMarkers((prev) => [...prev, copyMarker]);
    return copyMarker;
  };

  const deleteMarker = (markerId) => {
    const targetMarker = findMarker(markerId);
    const otherMarkers = exceptMarkers(markerId);
    targetMarker && targetMarker.marker.remove();
    setMarkers([...otherMarkers]);
    return otherMarkers;
  };

  return {
    createMarker,
    updateMarker,
    deleteMarker,
    isIncludeMarker,
    findMarker,
    exceptMarkers,
  };
};

export default useMarker;
