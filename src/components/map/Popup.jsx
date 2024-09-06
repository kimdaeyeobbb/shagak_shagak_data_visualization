import { useEffect } from "react";
import usePopup from "../../hooks/usePopup";
import useMapEvent from "../../hooks/useMapEvent";

// eslint-disable-next-line react/prop-types
const Popup = ({ id, latlng, children, popupoptions = {}, open, ...props }) => {
  const { createPopup, updatePopup, deletePopup, isIncludePopup } = usePopup();

  useMapEvent(
    "popupclose",
    () => {
      updatePopup(id, latlng, children, popupoptions, !open);
    },
    []
  );
  useMapEvent(
    "popupopen",
    () => {
      updatePopup(id, latlng, children, popupoptions, !open);
    },
    []
  );

  useEffect(() => {
    if (isIncludePopup(id))
      updatePopup(id, latlng, children, popupoptions, open);
    else createPopup(id, latlng, children, popupoptions, open);

    return () => {
      deletePopup(id);
    };
  }, []);

  return (
    <b className="a11y-hidden" {...props}>
      {children}
    </b>
  );
};

export default Popup;
