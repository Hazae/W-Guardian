import styled from "styled-components";
import { WeatherProps } from "../type/types";

export const WeatherIcons: React.FC<WeatherProps> = ({
  weatherData,
  isLoading,
  error,
}) => {
  const icon = `<img src="images/${weatherData?.weather[0].icon}.png" alt="${weatherData?.weather[0].icon}" />`;

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return <IconsCon>{icon}</IconsCon>;
};

const IconsCon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;
