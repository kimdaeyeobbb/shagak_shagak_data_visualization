import MapContainer from "../../../components/map/MapContainer";
import TileLayer from "../../../components/map/TileLayer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import useGeoLocation from "../../../hooks/useGeoLocation";
import { Outlet, useLocation } from "react-router-dom";
import FileInput from "../../../components/spread/FileInput";
import XlsxSheet from "../../../components/spread/XlsxSheet";
import { useState } from "react";

const Map04 = () => {
  const [data, setData] = useState([[]]);
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
            <h2>04 Data</h2>
            <p>사용자의 현재 위치를 기준으로 기본 지도를 불러옵니다.</p>
          </hgroup>
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
          <XlsxSheet data={data}></XlsxSheet>
          <FileInput setData={setData}></FileInput>
        </main>
      )}
    </>
  );
};

export default Map04;
