import * as L from "leaflet";
import { useEffect } from "react";
import useMarker from "../../hooks/useMarker";

const CustomMarker = ({
  latlng: [lat, lng],
  options: { iconUrl, iconSize, ...rest },
  children,
  id,
  ...props
}) => {
  const { createMarker, updateMarker, deleteMarker, isIncludeMarker } =
    useMarker();
  const Icon = L.icon({ iconUrl, iconSize });
  const markerOptions = iconUrl
    ? { ...rest, icon: Icon }
    : rest
    ? { ...rest }
    : undefined;

  useEffect(() => {
    let newMarker;

    if (isIncludeMarker(id))
      newMarker = updateMarker(id, [lat, lng], {
        ...markerOptions,
      });
    else
      newMarker = createMarker(id, [lat, lng], {
        ...markerOptions,
      });

    //popup 또는 tooltip 추가
    if (children) {
      if (typeof children !== "string" && children.length > 0) {
        children.map((child) => {
          if (child.type?.name === "Popup") newMarker.marker.bindPopup(child);
          else newMarker.marker.bindTooltip(child);
        });
      } else {
        newMarker.marker.bindTooltip(children);
      }
    }

    return () => {
      deleteMarker(id);
    };
  }, [iconUrl]);

  return (
    <b className="a11y-hidden" {...props}>
      {children}
    </b>
  );
};

export default CustomMarker;
