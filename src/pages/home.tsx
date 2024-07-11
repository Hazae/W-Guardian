import styled from "styled-components";
import CityName from "@/components/city-name";
import Temperature from "@/components/temperature";
import TodayDate from "@/components/date";
import { WeatherIcons } from "@/components/weather-icons";
import WeatherDescription from "@/components/weather-description";
import { useCurrentLocation } from "@/hooks/useGeoLocation";
import { useCurWeather } from "@/hooks/useWeather";
import Header from "./header";
import useWeather from "@/hooks/useWeather";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 1, // 1시간
};

const bgBright = ["01d", "02d", "50d"];
const bgCloudy = ["03d", "04d", "10d", "11d"];
const barNight = ["01n", "04n", "50n"];
const barPosition = ["02d", "04d"];

const Container = styled.div<{ $bgcolor: string }>`
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
  background-color: ${(props) =>
    (bgBright.includes(props.$bgcolor) && "#f6e8cf") ||
    (bgCloudy.includes(props.$bgcolor) && "#dbe1da") ||
    "#233947"};
`;

const Bar = styled.div<{ $colorposition: string }>`
  width: 10.5rem;
  height: 5px;
  position: absolute;
  top: ${(props) =>
    (props.$colorposition === "01d" && "45%") ||
    (barPosition.includes(props.$colorposition) && "55%") ||
    (barNight.includes(props.$colorposition) && "55%") ||
    "-99%"};
  right: 0;
  transform: ${(props) =>
    (props.$colorposition === "01d" && "translateY(-45%)") ||
    (barPosition.includes(props.$colorposition) && "translateY(-55%)") ||
    (barNight.includes(props.$colorposition) && "translateY(-55%)") ||
    "translateY(-99%)"};
  background-color: ${(props) =>
    (barNight.includes(props.$colorposition) && "#a2d6ea") ||
    (props.$colorposition === "01d" && "#233947") ||
    (props.$colorposition === "02d" && "#233947") ||
    (props.$colorposition === "03d" && "#233947") ||
    (props.$colorposition === "04d" && "#233947") ||
    "transparent"};
`;

const TopText = styled.div`
  width: 40%;
  margin-left: 5%;
  padding-top: 10%;
`;

const Home: React.FC = () => {
  const { loc } = useCurrentLocation(geolocationOptions);
  const { data, isLoading, error } = useCurWeather(
    loc?.latitude,
    loc?.longitude
  );

  const propsForCSS = data?.weather[0].icon as string;

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <Container className="mx-auto my-auto" $bgcolor={propsForCSS}>
      <Header $textcolor={propsForCSS} />
      <TopText>
        <TodayDate />
        <CityName weatherData={data} isLoading={isLoading} error={error} />
      </TopText>
      <WeatherIcons weatherData={data} isLoading={isLoading} error={error} />
      <Bar $colorposition={propsForCSS} />
      <WeatherDescription
        weatherData={data}
        isLoading={isLoading}
        error={error}
      />
      <Temperature weatherData={data} isLoading={isLoading} error={error} />
    </Container>
  );
};

export default Home;
