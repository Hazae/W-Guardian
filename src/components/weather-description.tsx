import styled from "styled-components";
import { WeatherProps } from "../type/types";

const WeatherDescription: React.FC<WeatherProps> = ({
  weatherData,
  isLoading,
  error,
}) => {
  let description;
  const propsForCSS = weatherData?.weather[0].icon as string;

  if (weatherData?.weather[0].description.includes("튼"))
    description = weatherData?.weather[0].description.replace("튼", "");
  else if (weatherData?.weather[0].description.includes("온"))
    description = weatherData?.weather[0].description.replace("온", "");
  else if (weatherData?.weather[0].description.includes("실"))
    description = weatherData?.weather[0].description.replace("실", "약한");
  else if (
    weatherData?.weather[0].description.includes("약간의 구름이 낀 하늘")
  )
    description = weatherData?.weather[0].description.replace(
      "약간의 구름이 낀 하늘",
      "약간 흐림"
    );
  else if (weatherData?.weather[0].description.includes("박무"))
    description = weatherData?.weather[0].description.replace("박무", "안개");
  else description = weatherData?.weather[0].description;

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <WeatherDesCon className="kr" $textcolor={propsForCSS}>
      {description}
    </WeatherDesCon>
  );
};

const textColorChange = ["01d", "02d", "50d", "50n", "03d", "04d", "10d"];

const WeatherDesCon = styled.div<{ $textcolor: string }>`
  font-size: 1.5rem;
  position: absolute;
  bottom: 7.8rem;
  right: 1.25rem;
  text-align: center;
  line-height: 2rem;
  padding: 0.15rem;
  color: ${(props) =>
    textColorChange.includes(props.$textcolor) ? "#233947" : "#fff"}};
`;

export default WeatherDescription;
