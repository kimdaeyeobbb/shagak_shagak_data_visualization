import { useEffect } from "react";
import useMarker from "../../hooks/useMarker";

const PopupMarker = ({
  latlng: [lat, lng],
  children,
  id,
  open,
  popup,
  ...props
}) => {
  const { createMarker, updateMarker, deleteMarker, isIncludeMarker } =
    useMarker();

  useEffect(() => {
    let newMarker;
    if (isIncludeMarker(id)) newMarker = updateMarker(id, [lat, lng]);
    else newMarker = createMarker(id, [lat, lng]);

    //popup 또는 tooltip 추가
    if (children) {
      console.log(children);
      if (popup) {
        newMarker.marker.bindPopup(children);
        if (open) newMarker.marker.openPopup();
      } else {
        newMarker.marker.bindTooltip(children);
        if (open) newMarker.marker.openTooltip();
      }
    }

    return () => {
      deleteMarker(id);
    };
  }, []);

  return (
    <b className="a11y-hidden" {...props}>
      {children}
    </b>
  );
};

export default PopupMarker;
