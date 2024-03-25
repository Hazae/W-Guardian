// import { useQuery } from "react-query";
import styled from "styled-components";
import { useCurrentLocation, useWatchLocation } from "../hooks/useGeoLocation";

// async function getWeatherData(lat: string, lon: string) {
//   const res = await fetch(
//     `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
//       import.meta.env.VITE_WEATHER_KEY
//     }`
//   );

//   return res.json();
// }

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const Home = () => {
  // const { data, isError, isLoading } = useQuery(
  //   "geolocation",
  //   useCurrentLocation(geolocationOptions)
  // );

  const { loc, error } = useCurrentLocation(geolocationOptions);

  return (
    <Container className="mx-auto my-auto">
      {loc ? `${loc.latitude}` : `${error}`}
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
