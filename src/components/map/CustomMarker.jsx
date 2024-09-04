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
    if (iconUrl && isIncludeMarker(id)) deleteMarker(id);

    if (isIncludeMarker(id))
      updateMarker(id, [lat, lng], {
        ...markerOptions,
      });
    else
      createMarker(id, [lat, lng], {
        ...markerOptions,
      });

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
