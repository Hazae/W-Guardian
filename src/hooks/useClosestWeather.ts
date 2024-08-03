import { WeatherForecastResponse } from "@/type/types";

// UTC 시간 변환 사이트: https://wei756.tistory.com/28
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/Date

const useClosestWeather = (data: WeatherForecastResponse | undefined) => {
  const now = new Date();
  let closest;
  let timezone: number;

  if (data) {
    closest = data.list[0];
    timezone = data.city.timezone;
    let minDiff = Math.abs(
      new Date((closest.dt + timezone) * 1000).getTime() - now.getTime()
    );

    data.list.forEach((item) => {
      const itemTime = new Date((item.dt + timezone) * 1000).getTime();
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
