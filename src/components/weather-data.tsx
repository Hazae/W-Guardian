import OpenWeatherMap from "openweathermap-ts";
import { useQuery, QueryFunctionContext } from "react-query";
import { useCurrentLocation } from "../hooks/useGeoLocation";

const apiKey = import.meta.env.VITE_WEATHER_KEY;

interface WeatherData {
  name: string;
}

interface WeatherAPIError extends Error {
  response?: {
    status: number;
    data: {
      code: string;
      message: string;
    }
  }
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

  const openWeather = await new OpenWeatherMap({
    apiKey: apiKey,
    units: "metric",
    language: "kr"
  });

  console.log(openWeather);

  const response = await openWeather.getCurrentWeatherByGeoCoordinates(
    lat,
    lonz
  );
  return response;
};

const GetWeather = () => {
  const { loc, error: locationError } = useCurrentLocation(geolocationOptions);

  // 구조분해할당으로 data 속성을 weatherData라는 변수 이름으로 할당
  const {
    data: weatherData,
    isLoading,
    isError,
    error,
  } = useQuery<WeatherData, WeatherAPIError>(
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
    return <div>날씨 정보를 불러오는 데 실패했습니다: {error.response?.data.message || error.message}</div>;

  return weatherData;
};

export default GetWeather;
