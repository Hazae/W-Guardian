import { useState, useEffect, useRef } from "react";

// GeoLocation 함수
// clearWatch: WatchPosition을 멈춘다.
// getCurrentPosition: 현재 위치를 가져온다.
// watchPosition: 지정된 시간마다 현재 위치를 가져온다.

interface currentLoc {
  latitude: number;
  longitude: number;
}

/*****************************************현재 위치 가져오기***************************************** */
export const useCurrentLocation = (options = {}) => {
  // location 정보 저장
  const [loc, setLoc] = useState<currentLoc>();
  //  에러 메시지 저장
  const [error, setError] = useState("");

  // geoloaction의 'getCurrentPosition' 메서드에 대한 성공 callback 핸들러
  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLoc({
      latitude,
      longitude,
    });
  };

  // 실패 callback 핸들러
  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // 웹브라우저에서 위치 수집에 실패하는 경우 오류로 처리
    if (!geolocation) {
      setError("위치 정보 수집에 실패했습니다.");
      return;
    }

    // 웹 API 호출
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { loc, error };
};

/*****************************************위치 모니터링***************************************** */
export const useWatchLocation = (options = {}) => {
  // 내 위치 정보 저장
  const [loc, setLoc] = useState<currentLoc>();
  // 에러 메시지 저장
  const [error, setError] = useState("");
  // watch 인스턴스 취소가 가능하도록 'watchPosition'에서 반환된 ID를 저장
  const locationWatchId = useRef(0);

  // 성공 콜백
  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLoc({
      latitude,
      longitude,
    });
  };

  // 에러 콜백
  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  // 저장된 watchPosition ID를 기반으로 감시 인스턴스 삭제
  const cancelLocationWatch = () => {
    const { geolocation } = navigator;

    if (locationWatchId.current && geolocation)
      geolocation.clearWatch(locationWatchId.current);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // 웹브라우저에서 위치 수집에 실패하는 경우 오류로 처리
    if (!geolocation) {
      setError("위치 정보 수집에 실패했습니다.");
      return;
    }

    // Geolocation API로 위치 감시 시작
    locationWatchId.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    // React가 사용된 구성 요소를 마운트 해제할 때 위치 감시 인스턴스 삭제
    return cancelLocationWatch;
  }, [options]);

  return { loc, cancelLocationWatch, error };
};
