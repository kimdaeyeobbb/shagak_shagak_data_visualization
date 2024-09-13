import { useEffect, useRef } from "react";
import usePopup from "../../hooks/usePopup";

// eslint-disable-next-line react/prop-types
const Popup = ({ id, latlng, children, popupoptions = {}, open, ...props }) => {
  const { createPopup, updatePopup, deletePopup, isIncludePopup } = usePopup();

  const popupRef = useRef(null);

  useEffect(() => {
    if (!popupRef.current) return;
    const content = popupRef.current;
    if (isIncludePopup(id))
      updatePopup(id, latlng, content, popupoptions, open);
    else createPopup(id, latlng, content, popupoptions, open);

    return () => {
      deletePopup(id);
    };
  }, [open, id, popupRef]);

  return (
    <dialog {...props} ref={popupRef}>
      {children}
    </dialog>
  );
};

export default Popup;
