/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import useMapEvent from "../../hooks/useMapEvent";
import useMarker from "../../hooks/useMarker";

const CustomMarker = ({
  latlng,
  options = {},
  children,
  id,
  tooltip,
  onClick,
  openPopup,
  ...props
}) => {
  const {
    createMarker,
    updateMarker,
    deleteMarker,
    isIncludeMarker,
    useMarkerEvent,
  } = useMarker();

  const markerRef = useRef(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [showPopup, setShowPopup] = useState(openPopup);

  const { iconUrl, iconSize, ...rest } = options;

  const Icon = L.icon({ iconUrl, iconSize });
  const Latlng = L.latLng(latlng);
  const markerOptions = iconUrl
    ? { ...rest, icon: Icon }
    : rest
    ? { ...rest }
    : undefined;

  useEffect(() => {
    if (isIncludeMarker(id)) {
      updateMarker(id, Latlng, {
        ...markerOptions,
      });
    } else {
      createMarker(id, Latlng, {
        ...markerOptions,
      });
    }
    return () => {
      deleteMarker(id);
    };
  }, [latlng]);

  useEffect(() => {
    if (currentMarker && markerRef.current) {
      currentMarker.bindPopup(markerRef.current);
    }
  }, [currentMarker, markerRef]);

  useMarkerEvent(
    "mouseover",
    (e) => {
      tooltip && e.target.bindTooltip(tooltip);
    },
    [tooltip]
  );
  useMarkerEvent(
    "click",
    (e) => {
      setCurrentMarker(e.target);
      setShowPopup(true);
      if (showPopup) e.target.openPopup();
      onClick && onClick(e);
    },
    [latlng]
  );

  useMapEvent(
    "popupclose",
    (e) => {
      setShowPopup(false);
      e.target._popup.closePopup();
    },
    [latlng]
  );

  return (
    <b {...props} ref={markerRef}>
      {children}
    </b>
  );
};

export default CustomMarker;
