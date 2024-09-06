import DefaultMarker from "../../../../components/map/DefaultMarker";
import MapContainer from "../../../../components/map/MapContainer";
import TileLayer from "../../../../components/map/TileLayer";
import useGeoLocation from "../../../../hooks/useGeoLocation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
const code = `import * as L from "leaflet";
import useMap from "./useMap";
import { useEffect, useState } from "react";

const useMarker = () => {
  const { value, dispatch } = useMap();

  const currentMarkers = [...value.marker];
  const [markers, setMarkers] = useState(currentMarkers);

  useEffect(() => {
    dispatch({ type: "update", value: { ...value, marker: markers } });
  }, [dispatch, markers, value]);

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
    const currentOptions = targetMarker.marker.options;
    const copyMarker = {
      ...targetMarker,
      marker: L.marker([lat, lng], options ? options : currentOptions),
    };
    const otherMarkers = exceptMarkers(markerId);
    setMarkers([...otherMarkers, copyMarker]);
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
  `;
const Map0201 = () => {
  const { loading, position } = useGeoLocation();

  return (
    <main>
      <hgroup>
        <h2>02-1 Marker</h2>
        <h3>현재 위치에 마커 표시하기</h3>
      </hgroup>
      <div style={{ width: `100%`, height: `50vh` }}>
        {!loading && (
          <MapContainer id="map_0201" center={position}>
            <TileLayer
              id="map_0201"
              url={
                "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
              }
              attribution={"0201"}
            />
            <DefaultMarker id="default" latlng={position} />
          </MapContainer>
        )}
      </div>
      <SyntaxHighlighter language="jsx">{code}</SyntaxHighlighter>
    </main>
  );
};

export default Map0201;
