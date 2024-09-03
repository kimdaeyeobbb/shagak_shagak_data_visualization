import "../../../styles/map.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import MapContainer from "../../../components/map/MapContainer";
import TileLayer from "../../../components/map/TileLayer";
import DefaultMarker from "../../../components/map/DefaultMarker";
import useGeoLocation from "../../../hooks/useGeoLocation";
import { Outlet, useLocation } from "react-router-dom";
const Map02 = () => {
  const { loading, position } = useGeoLocation();
  const location = useLocation();
  const path = location.pathname.split("/");
  const code = `<MapContainer center={position}>
  <TileLayer
    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
  />
  <DefaultMarker latlng={position} />
</MapContainer>`;
  return (
    <>
      {path[3] ? (
        <Outlet />
      ) : (
        <main>
          <hgroup>
            <h2>02 Marker</h2>
            <p>
              기본적으로 만들 수 있는 마커부터 마커를 활용한 데이터 시각화까지
              알아봅시다.
            </p>
          </hgroup>
          <section style={{ width: `100%`, height: `50vh` }}>
            {!loading && (
              <MapContainer id="map_0201" center={position}>
                <TileLayer
                  id="map_0201"
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
                />
                <DefaultMarker latlng={position} />
              </MapContainer>
            )}
          </section>
          <SyntaxHighlighter language="jsx">{code}</SyntaxHighlighter>
        </main>
      )}
    </>
  );
};

export default Map02;
