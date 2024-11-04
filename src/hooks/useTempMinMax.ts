import { useState, useEffect, useCallback } from "react";
import { WeatherForecastResponse } from "@/type/types";

interface TempMinMax {
  date: string;
  tempMax: number;
  tempMin: number;
}

const useTempMinMax = (data: WeatherForecastResponse | undefined) => {
  const [dailyTemps, setDailyTemps] = useState<TempMinMax[]>([]);

  const calculateDailyTemps = useCallback(
    (weatherData: WeatherForecastResponse) => {
      const tempsByDate: { [key: string]: { max: number[]; min: number[] } } =
        {};

      // 한국 시간으로 변환하고 날짜별로 기온 데이터 그룹화
      weatherData.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
        const dateKey = kstDate.toISOString().split("T")[0];

        if (!tempsByDate[dateKey]) {
          tempsByDate[dateKey] = { max: [], min: [] };
        }

        tempsByDate[dateKey].max.push(item.main.temp_max);
        tempsByDate[dateKey].min.push(item.main.temp_min);
      });

      // 날짜별 최고/최저 기온 계산
      const result = Object.entries(tempsByDate)
        .map(([date, temps]) => ({
          date,
          tempMax: Math.max(...temps.max),
          tempMin: Math.min(...temps.min),
        }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 4);

      return result;
    },
    []
  );

  useEffect(() => {
    if (data) {
      const temps = calculateDailyTemps(data);
      setDailyTemps(temps);
    }
  }, [data, calculateDailyTemps]);

  return dailyTemps;
};

export default useTempMinMax;
