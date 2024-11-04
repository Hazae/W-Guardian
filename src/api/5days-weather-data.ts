import OpenWeatherMap from "openweathermap-ts";
import { QueryFunctionContext } from "react-query";
import { WeatherForecastResponse } from "../type/types";

const apiKey = import.meta.env.VITE_WEATHER_KEY;

const fetch5dayWeather = async ({
  queryKey,
}: QueryFunctionContext): Promise<WeatherForecastResponse> => {
  const [, { lat, lon }] = queryKey as [string, { lat: number; lon: number }];

  const openWeather = await new OpenWeatherMap({
    apiKey: apiKey,
    units: "metric",
    language: "KR",
  });

  const response = await openWeather.getThreeHourForecastByGeoCoordinates(
    lat,
    lon
  );

  return response;
};

export default fetch5dayWeather;
