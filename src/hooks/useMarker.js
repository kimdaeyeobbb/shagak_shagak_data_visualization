import * as L from "leaflet";
import useMap from "./useMap";
import { useEffect, useState } from "react";

const useMarker = () => {
  const { value, dispatch } = useMap();

  const currentMarkers = [...value.marker];
  const [markers, setMarkers] = useState(currentMarkers);
  const [marker, setMarker] = useState(null);
  useEffect(() => {
    dispatch({
      type: "update",
      value: { ...value, marker: markers },
    });
  }, [markers, value]);

  const isIncludeMarker = (markerId) =>
    !currentMarkers.every((marker) => marker.id != markerId);
  const findMarker = (markerId) =>
    currentMarkers.filter((marker) => marker.id === markerId)[0];
  const exceptMarkers = (markerId) =>
    currentMarkers.filter((marker) => marker.id != markerId);

  const createMarker = (markerId, latlng, options) => {
    if (isIncludeMarker(markerId)) {
      console.log("중복된 id의 마커가 있습니다.");
      return findMarker(markerId);
    }
    const newMarker = {
      id: markerId,
      marker: L.marker(latlng, options),
    };
    setMarker(newMarker.marker);
    setMarkers((prev) => [...prev, newMarker]);
    return newMarker;
  };

  const updateMarker = (markerId, latlng, options) => {
    if (!marker) return;
    // latlng 값이 유효한지 확인
    if (!latlng || isNaN(latlng.lat) || isNaN(latlng.lng)) {
      console.error("Invalid latlng value:", latlng);
      return;
    }

    console.log("update", marker);
    const targetMarker = findMarker(markerId);
    const { marker: prevMarker, ...rest } = targetMarker;
    // 마커의 위치(latlng)를 업데이트
    prevMarker.setLatLng(latlng);

    // 아이콘도 업데이트
    if (options?.icon) {
      prevMarker.setIcon(options.icon);
    }

    const copyMarker = {
      ...rest,
      marker: prevMarker,
    };
    setMarker(copyMarker.marker);

    const otherMarkers = exceptMarkers(markerId);
    setMarkers([...otherMarkers, copyMarker]);
    return copyMarker;
  };

  const deleteMarker = (markerId) => {
    const targetMarker = findMarker(markerId);
    const otherMarkers = exceptMarkers(markerId);
    targetMarker && targetMarker.marker.remove();
    setMarkers([...otherMarkers]);
    setMarker(null);
    return otherMarkers;
  };

  const useMarkerEvent = (event, callback, array) => {
    useEffect(() => {
      if (!marker) return;
      const handleEvent = (e) => {
        const { lat, lng } = marker.getLatLng();
        if (isNaN(lat) || isNaN(lng)) {
          console.error("유효하지 않은 좌표", lat, lng);
          return;
        }
        callback(e);
      };

      marker.on(event, handleEvent);
      // marker.on(event, callback);
      return () => {
        marker.off(event);
      };
    }, [marker, value, ...array]);
  };

  return {
    marker,
    createMarker,
    updateMarker,
    deleteMarker,
    isIncludeMarker,
    findMarker,
    exceptMarkers,
    useMarkerEvent,
  };
};

export default useMarker;
