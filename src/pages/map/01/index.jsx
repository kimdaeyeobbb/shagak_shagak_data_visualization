import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "../../../styles/map.css";
import MapContainer from "../../../components/map/MapContainer";
import TileLayer from "../../../components/map/TileLayer";
import useGeoLocation from "../../../hooks/useGeoLocation";
const Map01 = () => {
  const { loading, position } = useGeoLocation();
  const code = `
  <MapContainer id="map_1" center={position}>
    <TileLayer
      id="map_1"
      url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
    />
  </MapContainer>
  `;
  return (
    <main>
      <hgroup>
        <h3>01 Map</h3>
        <p></p>
      </hgroup>
      <section>
        <h4>기본 지도 불러오기</h4>
        <div style={{ width: `100%`, height: `50vh` }}>
          {!loading && (
            <MapContainer id="map_1" center={position}>
              <TileLayer
                id="map_1"
                url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
                attribution={"01"}
              />
            </MapContainer>
          )}
        </div>
        <SyntaxHighlighter language="jsx">{code}</SyntaxHighlighter>
      </section>
    </main>
  );
};

export default Map01;
