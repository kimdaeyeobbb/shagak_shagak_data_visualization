import MapContainer from "../../../../components/map/MapContainer";
import Popup from "../../../../components/map/Popup";
import TileLayer from "../../../../components/map/TileLayer";
import useGeoLocation from "../../../../hooks/useGeoLocation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Map0202 = () => {
  const { loading, position } = useGeoLocation();
  const code = `import { useEffect, useState } from "react";
import usePopup from "../../hooks/usePopup";
import useMapEvent from "../../hooks/useMapEvent";

const Popup = ({ id, latlng, children, popupoptions = {}, open, ...props }) => {
  const { createPopup, updatePopup, deletePopup, isIncludePopup } = usePopup();

  const [popup, setPopup] = useState(null);

  useMapEvent(
    "popupclose",
    () => {
      updatePopup(id, latlng, children, popupoptions, !open);
    },
    [popup]
  );

  useEffect(() => {
    if (isIncludePopup(id))
      setPopup(updatePopup(id, latlng, children, popupoptions, open));
    else setPopup(createPopup(id, latlng, children, popupoptions, open));

    return () => {
      deletePopup(id);
      setPopup(null);
    };
  }, []);

  return (
    <b className="a11y-hidden" {...props}>
      {children}
    </b>
  );
};

export default Popup;
`;
  const codeUsePopup = `import * as L from "leaflet";
import { useEffect, useState } from "react";
import useMap from "./useMap";
const usePopup = () => {
  const { value, dispatch } = useMap();
  const currentPopups = [...value.popup];
  const [popups, setPopups] = useState(currentPopups);

  useEffect(() => {
    dispatch({
      type: "update",
      value: { ...value, popup: popups },
    });
  }, [popups]);

  const isIncludePopup = (popupId) =>
    !popups.every((popup) => popup.id != popupId);
  const findPopup = (popupId) =>
    popups.filter((popup) => popup.id == popupId)[0];
  const exceptPopups = (popupId) =>
    popups.filter((popup) => popup.id !== popupId);

  const createPopup = (
    popupId,
    latlng,
    content = "",
    popupoptions = {},
    open = false
  ) => {
    if (isIncludePopup(popupId)) {
      console.log("이미 존재하는 popup 입니다.");
      return findPopup(popupId);
    }
    const popup = L.popup(latlng, {
      content,
      ...popupoptions,
    });

    const newPopup = { id: popupId, popup };
    setPopups((prev) => [...prev, newPopup]);

    if (open) popup.openOn(value.map);
    return { id: popupId, popup, open };
  };

  const updatePopup = (
    popupId,
    latlng,
    content = "",
    popupoptions = {},
    open = false
  ) => {
    const targetPopup = findPopup(popupId);
    const { popup, ...rest } = targetPopup;

    const newPopup = L.popup(latlng, {
      content,
      ...popupoptions,
    });

    if (open) newPopup.openOn(value.map);

    const copyPopup = { ...rest, open, popup: newPopup };
    const otherPopups = exceptPopups(popupId);
    setPopups([...otherPopups, copyPopup]);

    return copyPopup;
  };

  const deletePopup = (popupId) => {
    const targetPopup = findPopup(popupId);
    const otherPopups = exceptPopups(popupId);
    targetPopup && targetPopup.popup.remove();
    setPopups([...otherPopups]);
    return otherPopups;
  };

  return {
    createPopup,
    updatePopup,
    deletePopup,
    isIncludePopup,
    findPopup,
    exceptPopups,
  };
};

export default usePopup;
`;
  return (
    <main>
      <hgroup>
        <h2>02-2 Popup & Tooltips</h2>
      </hgroup>
      <section style={{ width: "100%", height: "50vh" }}>
        {!loading && (
          <MapContainer center={position}>
            <TileLayer
              id="map_2"
              url={
                "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
              }
              attribution={"02"}
            />
            {/* <PopupMarker id="marker_popup" latlng={position} popup open>
              popup ? tooltip
            </PopupMarker> */}
            <Popup id="popup-1" className="popup" latlng={position} open>
              popup
            </Popup>
          </MapContainer>
        )}
      </section>
      <section>
        <SyntaxHighlighter language="jsx">{code}</SyntaxHighlighter>
      </section>
      <section>
        <hgroup>
          <h3>usePopup.js</h3>
          <p>
            useMarker와 마찬가지로 Popup을 위한 훅을 별도로 만들어 사용했습니다.
          </p>
        </hgroup>
        <SyntaxHighlighter language="jsx">{codeUsePopup}</SyntaxHighlighter>
      </section>
    </main>
  );
};

export default Map0202;
