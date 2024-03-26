// import { useQuery } from "react-query";
import styled from "styled-components";
// import { useCurrentLocation, useWatchLocation } from "../hooks/useGeoLocation";
import GetWeather from "@/components/weather-data";
import CityName from "@/components/city-name";
// import OpenWeatherMap from "openweathermap-ts";

const Home = () => {
  // const { loc, error } = useCurrentLocation(geolocationOptions);
  // getWeather();

  GetWeather();

  return (
    <Container className="mx-auto my-auto">
      <GetWeather />
      <CityName />
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
