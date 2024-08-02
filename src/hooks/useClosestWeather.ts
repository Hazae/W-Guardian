import { WeatherForecastResponse } from "@/type/types";

const useClosestWeather = (data: WeatherForecastResponse | undefined) => {
  const now = new Date();
  let closest;

  if (data) {
    closest = data.list[0];
    let minDiff = Math.abs(new Date(closest.dt_txt).getTime() - now.getTime());

    data.list.forEach((item) => {
      const itemTime = new Date(item.dt_txt).getTime();
      const diff = Math.abs(itemTime - now.getTime());

      if (diff < minDiff) {
        closest = item;
        minDiff = diff;
      }
    });
  }

  return closest;
};

export default useClosestWeather;
