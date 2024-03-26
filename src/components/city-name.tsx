import { useQuery, QueryFunctionContext } from "react-query";
import OpenWeatherMap from "openweathermap-ts";
import { useCurrentLocation } from "../hooks/useGeoLocation";

const apiKey = import.meta.env.VITE_WEATHER_KEY;

interface WeatherData {
  name: string;
}

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 24, // 24시간
};

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
  return response;
};

interface CityNameProps {
  lat: number;
  lon: number;
}

const CityName: React.FC<CityNameProps> = ({ lat, lon }) => {
  const { loc, error: locationError } = useCurrentLocation(geolocationOptions);

  const {
    data: weatherData,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["get-weather-data", { lat: loc?.latitude, lon: loc?.longitude }],
    fetchWeather,
    {
      enabled: !!loc, // loc이 있을 때만 쿼리 실행
      retry: 1,
      staleTime: 1000 * 60, // 1분
    }
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error?.message}</div>;

  return <div>city: {weatherData?.name}</div>;
};

export default CityName;
