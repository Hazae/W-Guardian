import { useQuery } from "react-query";

async function getWeatherData(lat: string, lon: string) {
  const res = await fetch(
    `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_WEATHER_KEY
    }`
  );

  return res.json();
}

const Home = (lat: string, lon: string) => {
  const { data, isError, isLoading } = useQuery("", getWeatherData(lat, lon));

  return <div>index</div>;
};

export default Home;
