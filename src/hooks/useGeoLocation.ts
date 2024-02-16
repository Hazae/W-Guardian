import { useState, useEffect } from "react";

interface currentLoc {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = (options = {}) => {
  const [loc, setLoc] = useState<currentLoc>();
  const [error, setError] = useState("");

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLoc({
      latitude,
      longitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("위치 정보 획득에 실패했습니다.");
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { loc, error };
};
