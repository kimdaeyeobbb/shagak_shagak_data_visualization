import useGeoLocation from "../../../../hooks/useGeoLocation";
import MapContainer from "../../../../components/map/MapContainer";
import TileLayer from "../../../../components/map/TileLayer";
import VectorLayer from "../../../../components/map/VectorLayer";

const Map0301 = () => {
  const { loading, position } = useGeoLocation();

  return (
    <main>
      <section style={{ width: `100%`, height: `50vh` }}>
        {!loading && (
          <MapContainer id="map_1" center={position}>
            <TileLayer
              id="map_1"
              url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
              attribution={"01"}
            />
            <VectorLayer></VectorLayer>
          </MapContainer>
        )}
      </section>
    </main>
  );
};

export default Map0301;
