import styled from "styled-components";
import { WeatherProps } from "../type/types";

const Temperature: React.FC<WeatherProps> = ({
  weatherData,
  isLoading,
  error,
}) => {
  const temperature = weatherData?.main?.temp as number; // 타입 단언

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return <CityTempCon>{Math.floor(temperature)}°C</CityTempCon>;
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
