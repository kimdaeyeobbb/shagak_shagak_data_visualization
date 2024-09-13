import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState([]);

  const onSuccess = (position) => {
    const currentPosition = position.coords;
    setPosition([currentPosition.latitude, currentPosition.longitude]);
    setLoading(false);
  };

  const onError = (error) => {
    console.log(`ERROR(${error.code}): ${error.message}`);
    setLoading(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return { position, loading };
};

export default useGeoLocation;
