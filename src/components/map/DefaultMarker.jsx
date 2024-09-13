import { useEffect } from "react";
import useMarker from "../../hooks/useMarker";

// eslint-disable-next-line react/prop-types
const DefaultMarker = ({ latlng: [lat, lng], children, id, ...props }) => {
  const { createMarker, updateMarker, deleteMarker, isIncludeMarker } =
    useMarker();

  useEffect(() => {
    if (isIncludeMarker(id)) updateMarker(id, [lat, lng]);
    else createMarker(id, [lat, lng]);

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

export default DefaultMarker;
