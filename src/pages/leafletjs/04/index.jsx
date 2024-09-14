import MapContainer from "../components/map/MapContainer";
import TileLayer from "../components/map/TileLayer";
import useGeoLocation from "../hooks/useGeoLocation";
import { Outlet, useLocation } from "react-router-dom";
import FileInput from "../components/spread/FileInput";
import XlsxSheet from "../components/spread/XlsxSheet";
import { useEffect, useMemo, useState } from "react";
import FileExport from "../components/spread/FileExport";

import * as XLSX from "xlsx-js-style";
import CustomMarker from "../components/map/CustomMarker";

const Map04 = () => {
  const { loading, position } = useGeoLocation();

  const [data, setData] = useState([[]]);
  const [markers, setMarkers] = useState([[]]);
  const location = useLocation();
  const path = location.pathname.split("/");

  useEffect(() => {
    if (loading || !position) return;

    const initData = Array.from({ length: 10 }, (_, idx) => ({
      id: `data-${idx}`,
      latitude: parseFloat(Math.random() / 20) + position[0],
      longitude: parseFloat(Math.random() / 20) + position[1],
    }));

    setMarkers(initData);
  }, [loading, position]);

  const refinedData = useMemo(() => {
    const titleKeys = Object.keys(markers[0]);
    const rows = markers.map((item) => Object.values(item));
    return [titleKeys, ...rows];
  }, [markers]);

  useEffect(() => {
    if (!markers.length) return;

    const csvContent = refinedData.map((row) => row.join(",")).join("\n");

    const workbook = XLSX.read(csvContent, { type: "string" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    setData(sheet);
  }, [markers]);

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
              <MapContainer id="map_04" center={position}>
                <TileLayer
                  id="map_1"
                  url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
                  attribution={"04"}
                />
                {markers.length > 0 &&
                  markers.map((d) => (
                    <CustomMarker
                      key={d.id + d}
                      id={d.id}
                      latlng={[d.latitude, d.longitude]}
                    ></CustomMarker>
                  ))}
              </MapContainer>
            )}
          </div>
          <section>
            <XlsxSheet data={data}></XlsxSheet>
            <FileInput setData={setData}></FileInput>
            <FileExport data={markers}></FileExport>
          </section>
        </main>
      )}
    </>
  );
};

export default Map04;
