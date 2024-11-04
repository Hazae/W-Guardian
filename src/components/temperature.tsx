import styled from "styled-components";
import { WeatherProps } from "../type/types";

const Temperature: React.FC<WeatherProps> = ({
  weatherData,
  isLoading,
  error,
}) => {
  const temperature = weatherData?.main?.temp as number; // 타입 단언
  const propsForCSS = weatherData?.weather[0].icon as string;

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <CityTempCon $textcolor={propsForCSS}>
      {Math.round(temperature)}°
    </CityTempCon>
  );
};

const textColorChange = ["01d", "02d", "50d", "50n", "03d", "04d", "10d"];

const CityTempCon = styled.div<{ $textcolor: string }>`
  font-size: 3rem;
  position: absolute;
  bottom: 4.5rem;
  right: 1.25rem;
  text-align: center;
  line-height: 2rem;
  padding: 0.15rem;
  color: ${(props) =>
    textColorChange.includes(props.$textcolor) ? "#233947" : "#fff"}};
`;

export default Temperature;
