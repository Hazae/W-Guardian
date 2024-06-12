import styled from "styled-components";
import CityName from "@/components/city-name";
import Temperature from "@/components/temperature";
import TodayDate from "@/components/date";
import WeatherDescription from "@/components/weather-description";
import { useCurrentLocation } from "@/hooks/useGeoLocation";
import useWeather from "@/hooks/useWeather";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 24, // 24시간
};

const Home: React.FC = () => {
  const { loc } = useCurrentLocation(geolocationOptions);
  const { data, isLoading, error } = useWeather(loc?.latitude, loc?.longitude);

  return (
    <Container className="mx-auto my-auto">
      <TodayDate />
      <CityName weatherData={data} isLoading={isLoading} error={error} />
      <WeatherDescription
        weatherData={data}
        isLoading={isLoading}
        error={error}
      />
      <Temperature weatherData={data} isLoading={isLoading} error={error} />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f6e8c1;
  font-size: 1rem;
`;

export default Home;
