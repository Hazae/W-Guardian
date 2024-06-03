import { useQuery } from "react-query";
import  { fetchWeather, WeatherData }  from '../components/weather-data';

interface WeatherAPIError extends Error {
  response?: {
    status: number;
    data: {
      code: string;
      message: string;
    }
  }
}

const useWeather = (lat: number | undefined, lon: number | undefined) => {
  return useQuery<WeatherData, WeatherAPIError>(['weather', { lat, lon }], fetchWeather, {
    enabled: !!lat && !!lon, // lat과 lon이 모두 유효할 때만 쿼리를 활성화
    retry: 1,
    staleTime: 1000 * 60 // 1분
  });
};

export default useWeather;
