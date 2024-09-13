import MapContainer from "../../../../components/map/MapContainer";
import TileLayer from "../../../../components/map/TileLayer";
import useGeoLocation from "../../../../hooks/useGeoLocation";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Map0102 = () => {
  const { loading, position } = useGeoLocation();
  const code = `import { useEffect } from "react";
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

export default TileLayer;`;
  return (
    <main>
      <hgroup>
        <h2>01-2 TileLayer</h2>
        <p>실제 지도를 가져옵니다. </p>
      </hgroup>
      <section>
        {!loading && (
          <MapContainer
            id="map_1"
            center={position}
            style={{ height: "50vh", width: "100%" }}
          >
            <TileLayer
              id="map_2"
              url={
                "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
              }
              attribution={"01"}
            />
          </MapContainer>
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

export default Map0102;
