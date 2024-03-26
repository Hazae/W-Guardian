import { useQuery, QueryFunctionContext } from "react-query";
import OpenWeatherMap from "openweathermap-ts";

const apiKey = import.meta.env.VITE_WEATHER_KEY as string;

interface WeatherData {
  name: string;
}

const fetchWeather = async ({
  queryKey,
}: QueryFunctionContext): Promise<WeatherData> => {
  const [key, { lat, lon }] = queryKey as [
    string,
    { lat: number; lon: number }
  ];
  const openWeather = new OpenWeatherMap({ apiKey: apiKey });
  const response = await openWeather.getCurrentWeatherByGeoCoordinates(
    lat,
    lon
  );

  console.log(response);
  return response;
};

interface CityNameProps {
  lat: number;
  lon: number;
}

const CityName: React.FC<CityNameProps> = ({ lat, lon }) => {
  const {
    data: weatherData,
    isLoading,
    isError,
    error,
  } = useQuery<WeatherData, Error>(
    ["get-weather-data", { lat, lon }],
    fetchWeather,
    {
      enabled: !!lat && !!lon, // lat과 lon이 있을 때만 쿼리 실행
    }
  );

  console.log(weatherData);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error?.message}</div>;

  return <div>city: {weatherData?.name}</div>;
};

export default CityName;
