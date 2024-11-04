import { useState, useEffect, useRef, useCallback } from "react";
import { WeatherForecastResponse, WeatherForecastList } from "@/type/types";

const useClosestWeather = (data: WeatherForecastResponse | undefined) => {
  const [closestWeather, setClosestWeather] = useState<
    WeatherForecastList[number] | null
  >(null);
  const prevDataRef = useRef<WeatherForecastResponse>();

  // 메모이제이션
  const findClosestWeather = useCallback(
    (weatherData: WeatherForecastResponse) => {
      const now = new Date();
      let closest = weatherData.list[0];
      let minDiff = Math.abs(
        new Date(closest.dt * 1000).getTime() - now.getTime()
      );

      for (let i = 1; i < weatherData.list.length; i++) {
        const itemTime = new Date(weatherData.list[i].dt * 1000).getTime();
        const diff = Math.abs(itemTime - now.getTime());
        if (diff < minDiff) {
          minDiff = diff;
          closest = weatherData.list[i];
        }
      }

      return closest;
    },
    []
  );

  useEffect(() => {
    if (data && data !== prevDataRef.current) {
      const closest = findClosestWeather(data);
      if (!closestWeather || closest.dt !== closestWeather.dt) {
        setClosestWeather(closest);
      }
      prevDataRef.current = data;
    }
  }, [data, findClosestWeather]);

  return closestWeather;
};

export default useClosestWeather;
