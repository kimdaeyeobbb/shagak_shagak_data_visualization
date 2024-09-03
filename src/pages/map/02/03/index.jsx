import "../../../../styles/map.css";
import { useState } from "react";
import MapContainer from "../../../../components/map/MapContainer";
import TileLayer from "../../../../components/map/TileLayer";
import useGeoLocation from "../../../../hooks/useGeoLocation";
import IconInput from "../../../../components/map/IconInput";
import CustomMarker from "../../../../components/map/CustomMarker";
const DEFAULT_SIZE = 24;
const Map0203 = () => {
  const { loading, position } = useGeoLocation();
  const [icon, setIcon] = useState({ file: "", size: DEFAULT_SIZE });
  const options = { iconUrl: icon.file, iconSize: icon.size };

  return (
    <main>
      <hgroup>
        <h2>02-2 Custom Marker</h2>
        <p>입력받은 아이콘을 토대로 마커를 생성합니다.</p>
      </hgroup>
      <section style={{ width: "100%", height: "50vh" }}>
        {!loading && (
          <MapContainer id={options.toString()} center={position}>
            <TileLayer
              id="map_2"
              url={
                "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
              }
              attribution={"02"}
            />
            <CustomMarker
              id="marker_icon"
              options={{ iconUrl: icon.file, iconSize: icon.size }}
              latlng={position}
            />
          </MapContainer>
        )}
      </section>
      <section style={{ display: "flex" }}>
        <IconInput onInput={setIcon} />
        <div>
          <p>img:</p>
          {icon.file && (
            <img src={icon.file} alt="입력된 아이콘" width={DEFAULT_SIZE} />
          )}
          <p> size: {icon ? icon.size : DEFAULT_SIZE}</p>
        </div>
      </section>
    </main>
  );
};

export default Map0203;
