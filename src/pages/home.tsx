// import { useQuery } from "react-query";
import styled from "styled-components";

// async function getWeatherData(lat: string, lon: string) {
//   const res = await fetch(
//     `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
//       import.meta.env.VITE_WEATHER_KEY
//     }`
//   );

//   return res.json();
// }

const Home = (lat: string, lon: string) => {
  // const { data, isError, isLoading } = useQuery("", getWeatherData(lat, lon));

  return <Container className="mx-auto my-auto">index</Container>;
};

const Container = styled.div`
  width: 88.88vw;
  height: 94.44vh;
  background-color: #f6e8c1;
  font-size: 1rem;
`;

export default Home;
