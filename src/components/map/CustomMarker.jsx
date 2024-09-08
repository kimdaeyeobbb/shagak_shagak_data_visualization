/* eslint-disable react/prop-types */
import * as L from "leaflet";
import { useEffect, useState } from "react";
import useMarker from "../../hooks/useMarker";
import Popup from "./Popup";
import useMapEvent from "../../hooks/useMapEvent";

const CustomMarker = ({ latlng, options, children, id, ...props }) => {
  const {
    createMarker,
    updateMarker,
    deleteMarker,
    isIncludeMarker,
    useMarkerEvent,
  } = useMarker();
  const { iconUrl, iconSize, ...rest } = options;
  const [open, setOpen] = useState(false);
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
  }, [options]);

  useMapEvent(
    "popupclose",
    () => {
      setOpen(false);
    },
    []
  );

  useMarkerEvent(
    "click",
    () => {
      setOpen(true);
    },
    [options]
  );
  return (
    <b className="a11y-hidden" {...props}>
      {children && (
        <Popup id={id} latlng={Latlng} open={open}>
          {children}
        </Popup>
      )}
    </b>
  );
};

export default CustomMarker;
