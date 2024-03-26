import OpenWeatherMap from "openweathermap-ts";
import { useQuery } from "react-query";
import { useCurrentLocation } from "../hooks/useGeoLocation";

const apiKey = import.meta.env.VITE_WEATHER_KEY;

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 24, // 24시간
};

const fetchWeather = async ({ queryKey }) => {
  const [_key, { lat, lon }] = queryKey;
  const openWeather = new OpenWeatherMap({ apiKey: apiKey });
  const response = await openWeather.getCurrentWeatherByGeoCoordinates(
    lat,
    lon
  );
  return response;
};

const GetWeather = () => {
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

  if (locationError) return <div>위치 정보를 불러오는 데 실패했습니다.</div>;
  if (!loc || isLoading) return <div>날씨 정보를 불러오는 중...</div>;
  if (isError)
    return <div>날씨 정보를 불러오는 데 실패했습니다: {error.message}</div>;

  // 날씨 정보를 화면에 표시
  return (
    <div>
      <h2>현재 날씨 정보</h2>
      <p>도시: {weatherData.name}</p>
      <p>온도: {weatherData.main.temp}°C</p>
      <p>날씨: {weatherData.weather[0].main}</p>
      <p>풍속: {weatherData.wind.speed}m/s</p>
    </div>
  );
};

export default GetWeather;
