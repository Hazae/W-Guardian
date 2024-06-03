import styled from "styled-components";
import { useCurrentLocation } from "@/hooks/useGeoLocation";
import useWeather from "@/hooks/useWeather";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 24, // 24시간
};

const Temperature: React.FC = () => {
  const { loc } = useCurrentLocation(geolocationOptions); 
  const { data, isLoading, error } = useWeather(loc?.latitude, loc?.longitude);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return <CityTempCon>{data?.main?.temp}°C</CityTempCon>;
};

const CityTempCon = styled.div`
  font-size: 1.5rem;
  position: absolute;
  bottom: 4.5rem;
  right: 1.25rem;
  background-color: #fff;
  text-align: center;
  line-height: 2rem;
  padding: 0.15rem;
`;

export default Temperature;
