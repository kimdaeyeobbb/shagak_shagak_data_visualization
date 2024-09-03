import "../../../../styles/map.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import useGeoLocation from "../../../../hooks/useGeoLocation";
import MapContainer from "../../../../components/map/MapContainer";
const Map0101 = () => {
  const { loading, position } = useGeoLocation();

  const code = `import { useEffect, useReducer, useRef, useState } from "react";
import { LeafletContext } from "../../hooks/useMap";
import * as L from "leaflet";

const initValue = {
  id: null,
  map: null,
  tileLayer: null,
  center: [0, 0],
  zoom: 13,
  marker: [],
  popup: [],
};
const reducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case "init": {
      state.id = value.id;
      state.map = value.map;
      state.center = value.center;
      state.zoom = value.zoom ?? state.zoom;

      break;
    }
    case "create": {
      state.map = value.map;
      state.zoom = value.zoom ?? state.zoom;
      state.marker = value.marker ?? [];
      break;
    }
    case "update": {
      state.map = value.map ?? state.map;
      state.center = value.center ?? state.center;
      state.zoom = value.zoom ?? state.zoom;
      state.marker = value.marker ?? state.marker;

      state.marker &&
        state.marker.forEach((mark) => {
          mark && mark.marker.addTo(state.map);
        });
      break;
    }
    case "delete": {
      state = initValue;
      break;
    }
    default:
      state = initValue;
  }
  return state;
};

const MapContainer = ({ center, id, children, ...props }) => {
  const [value, dispatch] = useReducer(reducer, initValue);

  const mapRef = useRef(null);

  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const newMap = L.map(id);
    newMap.setView(center, value.zoom);
    mapRef.current = newMap;
    dispatch({
      type: "init",
      value: { id: id, center: center, map: newMap },
    });
    setMap(newMap);

    return () => {
      newMap.remove();
      dispatch({ type: "delete" });
    };
  }, [center, id, value]);

  return (
    <div id={id} ref={mapRef} style={{ width: "100%", height: "100%" }}>
      {map && (
        <LeafletContext.Provider value={{ value, dispatch }} {...props}>
          {children}
        </LeafletContext.Provider>
      )}
    </div>
  );
};

export default MapContainer;`;
  return (
    <main style={{ height: "100%", width: "100%" }}>
      <hgroup>
        <h2>01-1 MapContainer</h2>
        <p>지도가 보일 영역을 만듭니다.</p>
      </hgroup>
      <section>
        {!loading && (
          <MapContainer
            id="map_1"
            center={position}
            style={{ height: "50vh", width: "100%" }}
          ></MapContainer>
        )}
      </section>
      <section>
        <SyntaxHighlighter showLineNumbers language="jsx">
          {code}
        </SyntaxHighlighter>
      </section>
    </main>
  );
};

export default Map0101;
