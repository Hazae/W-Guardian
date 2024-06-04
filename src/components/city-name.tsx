import styled from "styled-components";
import { useCurrentLocation } from "@/hooks/useGeoLocation";
import useWeather from "@/hooks/useWeather";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 24, // 24시간
};

const CityName: React.FC = () => {
  const { loc } = useCurrentLocation(geolocationOptions);
  const { data, isLoading, error } = useWeather(loc?.latitude, loc?.longitude);
  let city = "";

  if (data?.name.includes("-si")) city = data?.name.replace("-si", "");
  else if (data?.name.includes("-dong")) city = data?.name.replace("-dong", "");

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return <CityNameCon>{city}</CityNameCon>;
};

const CityNameCon = styled.div`
  font-size: 1.5rem;
  position: absolute;
  top: 5rem;
  left: 1.25rem;
  background-color: #fff;
  text-align: center;
  line-height: 2rem;
  padding: 0.15rem;
`;

export default CityName;
