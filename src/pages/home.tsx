import styled from "styled-components";
import CityName from "@/components/city-name";
import Temperature from "@/components/temperature";
import TodayDate from "@/components/date";
import { WeatherIcons } from "@/components/weather-icons";
import WeatherDescription from "@/components/weather-description";
import { useCurrentLocation } from "@/hooks/useGeoLocation";
import useWeather from "@/hooks/useWeather";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 24, // 24시간
};

const bgBright = "01d" || "02d" || "50d" || "50n";
const bgCloudy = "03d" || "04d" || "10d";
const barNight = "01n" || "04n";
const barPosition = "02d" || "04d";

const Container = styled.div<{ $bgcolor?: string }>`
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
  background-color: ${(props) =>
    props.$bgcolor === bgBright
      ? "#f6e8cf"
      : props.$bgcolor === bgCloudy
      ? "#dbe1da"
      : "#233947"};
`;

const Bar = styled.div<{ $colorposition?: string }>`
  width: 10.5rem;
  height: 5px;
  position: absolute;
  top: ${(props) =>
    props.$colorposition === "01d"
      ? "45%"
      : props.$colorposition === barPosition ||
        props.$colorposition === barNight
      ? "55%"
      : "-99%"};
  right: 0;
  transform: ${(props) =>
    props.$colorposition === "01d"
      ? "translateY(-45%)"
      : props.$colorposition === barPosition ||
        props.$colorposition === barNight
      ? "translateY(-55%)"
      : "0"};
  background-color: ${(props) =>
    props.$colorposition === barNight
      ? "#a2d6ea"
      : props.$colorposition === "01d" || props.$colorposition === "02d"
      ? "#233947"
      : "transparent"};
`;

const Home: React.FC = () => {
  const { loc } = useCurrentLocation(geolocationOptions);
  const { data, isLoading, error } = useWeather(loc?.latitude, loc?.longitude);

  return (
    <Container className="mx-auto my-auto" $bgcolor={data?.weather[0].icon}>
      <TodayDate />
      <CityName weatherData={data} isLoading={isLoading} error={error} />
      <WeatherIcons weatherData={data} isLoading={isLoading} error={error} />
      <Bar $colorposition={data?.weather[0].icon} />
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
