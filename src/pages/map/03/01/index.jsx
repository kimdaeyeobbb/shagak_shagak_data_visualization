import useGeoLocation from "../../../../hooks/useGeoLocation";
import MapContainer from "../../../../components/map/MapContainer";
import TileLayer from "../../../../components/map/TileLayer";
import Button from "../../../../components/map/Button";
import { useState } from "react";
import VectorLayer from "../../../../components/map/VectorLayer";
import StyleInput from "../../../../components/map/StyleInput";

const Map0301 = () => {
  const { loading, position } = useGeoLocation();
  const [shape, setShape] = useState("");
  const [style, setStyle] = useState({});

  const handleClickButton = (e) => {
    setShape(e.target.innerText);
  };

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
            <VectorLayer shape={shape} pathStyle={style}></VectorLayer>
          </MapContainer>
        )}
      </section>

      <section className="layout">
        <StyleInput setStyle={setStyle}></StyleInput>
        <div style={{ flexBasis: "50%" }}>
          <p>현재 도형: {shape}</p>
          {/* <Button onClick={handleClickButton}>path</Button> */}

          <Button onClick={handleClickButton}>polyline</Button>
          <Button onClick={handleClickButton}>polygon</Button>
          <Button onClick={handleClickButton}>rectangle</Button>
          <Button onClick={handleClickButton}>circle</Button>
          <Button onClick={handleClickButton}>circleMarker</Button>
          <Button onClick={handleClickButton}>svg</Button>
          <Button onClick={handleClickButton}>canvas</Button>
        </div>
      </section>
    </main>
  );
};

export default Map0301;
