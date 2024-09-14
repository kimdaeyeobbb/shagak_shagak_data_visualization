import MapContainer from "../components/map/MapContainer";
import TileLayer from "../components/map/TileLayer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import useGeoLocation from "../hooks/useGeoLocation";
import { Outlet, useLocation } from "react-router-dom";
import VectorLayer from "../components/map/VectorLayer";

const Map03 = () => {
  const { loading, position } = useGeoLocation();
  const location = useLocation();
  const path = location.pathname.split("/");
  const code = ``;
  return (
    <>
      {path[3] ? (
        <Outlet />
      ) : (
        <main>
          <hgroup>
            <h2>03 Vector</h2>
            <p>Vector Layer 기능을 사용하여 지도에 원하는 그림을 그립니다.</p>
          </hgroup>
          <div style={{ width: `100%`, height: `50vh` }}>
            {!loading && (
              <MapContainer id="map_1" center={position}>
                <TileLayer
                  id="map_1"
                  url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
                  attribution={"01"}
                />
                <VectorLayer shape={"polygon"}></VectorLayer>
              </MapContainer>
            )}
          </div>
          <SyntaxHighlighter language="jsx">{code}</SyntaxHighlighter>
        </main>
      )}
    </>
  );
};

export default Map03;
