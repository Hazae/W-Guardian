import OpenWeatherMap from "openweathermap-ts";
import { QueryFunctionContext } from "react-query";

const apiKey = import.meta.env.VITE_WEATHER_KEY;

export interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
}

export const fetchWeather = async ({
  queryKey,
}: QueryFunctionContext): Promise<WeatherData> => {
  const [key, { lat, lon }] = queryKey as [
    string,
    { lat: number; lon: number }
  ];

  const openWeather = await new OpenWeatherMap({
    apiKey: apiKey,
    units: "metric",
    language: "KR"
  });

  const response = await openWeather.getCurrentWeatherByGeoCoordinates(
    lat,
    lon
  );
  return response;
};