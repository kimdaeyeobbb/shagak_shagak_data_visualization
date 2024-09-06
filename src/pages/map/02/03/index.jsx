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
      <div className="layout">
        <section style={{ width: "100%", height: "50vh" }}>
          {!loading && (
            <MapContainer id="map_0203" center={position}>
              <TileLayer
                id="map_0203"
                url={
                  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
                }
                attribution={"0203"}
              />
              <CustomMarker
                id="marker_icon_1"
                options={options}
                latlng={position}
              />
            </MapContainer>
          )}
        </section>
        <section style={{ flexBasis: `30%` }}>
          <div>
            <p>아이콘 미리보기</p>
            {icon.file ? (
              <img
                src={icon.file}
                alt="입력된 아이콘"
                width={DEFAULT_SIZE * 3}
              />
            ) : (
              <p>👇아이콘을 추가해주세요</p>
            )}
          </div>
          <IconInput onInput={setIcon} />
        </section>
      </div>
    </main>
  );
};

export default Map0203;
