import { useQuery } from "react-query";
import fetchWeather from "../api/weather-data";
import {
  WeatherData,
  WeatherAPIError,
  WeatherForecastResponse,
} from "../type/types";
import fetch5dayWeather from "@/api/5days-weather-data";

export const useCurWeather = (
  lat: number | undefined,
  lon: number | undefined
) => {
  return useQuery<WeatherData, WeatherAPIError>(
    ["weather", { lat, lon }],
    fetchWeather,
    {
      enabled: !!lat && !!lon, // lat과 lon이 모두 유효할 때만 쿼리를 활성화
      retry: 1,
      staleTime: 1000 * 600, // 10분
      cacheTime: 1000 * 600,
    }
  );
};

export const useWeathers = (
  lat: number | undefined,
  lon: number | undefined
) => {
  return useQuery<WeatherForecastResponse, WeatherAPIError>(
    ["5days-weather", { lat, lon }],
    fetch5dayWeather,
    {
      enabled: !!lat && !!lon,
      retry: 1,
      staleTime: 1000 * 600,
      cacheTime: 1000 * 600,
    }
  );
};
