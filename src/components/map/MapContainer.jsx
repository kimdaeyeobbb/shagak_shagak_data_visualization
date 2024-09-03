import { useEffect, useReducer, useRef, useState } from "react";
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
      state.popup = value.popup ?? state.popup;
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

const MapContainer = ({ center, id = "map", children, ...props }) => {
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
    <div
      id={id}
      ref={mapRef}
      style={{ width: `100%`, height: `100%` }}
      {...props}
    >
      {map && (
        <LeafletContext.Provider value={{ value, dispatch }}>
          {children}
        </LeafletContext.Provider>
      )}
    </div>
  );
};

export default MapContainer;
