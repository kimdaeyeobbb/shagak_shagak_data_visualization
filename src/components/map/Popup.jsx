import { useEffect, useState } from "react";
import usePopup from "../../hooks/usePopup";
import useMapEvent from "../../hooks/useMapEvent";

// eslint-disable-next-line react/prop-types
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
  useMapEvent(
    "popupopen",
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
