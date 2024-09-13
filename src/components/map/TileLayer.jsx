import { useEffect } from "react";
import * as L from "leaflet";
import useMap from "../../hooks/useMap";

const TileLayer = ({ id, url, attribution, options }) => {
  const { value, dispatch } = useMap();
  useEffect(() => {
    if (!value.map) return;
    const currentMap = value.map;
    const tileLayer = L.tileLayer(url, {
      id: id,
      attribution,
      ...options,
    }).addTo(currentMap);

    currentMap.options.layers = tileLayer;
    dispatch({
      type: "create",
      value: { ...value, map: currentMap },
    });
    return () => {
      value.map.removeLayer(tileLayer);
    };
  }, []);

  return null;
};

export default TileLayer;
