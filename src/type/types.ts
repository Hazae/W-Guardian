import OpenWeatherMap from "openweathermap-ts";

export type WeatherData = Awaited<
  ReturnType<OpenWeatherMap["getCurrentWeatherByGeoCoordinates"]>
>;

export interface WeatherAPIError extends Error {
  response?: {
    status: number;
    data: {
      code: string;
      message: string;
    };
  };
}

export interface WeatherProps {
  weatherData: WeatherData | undefined;
  isLoading: boolean;
  error: WeatherAPIError | null;
}

export type WeatherForecastResponse = ReturnType<
  OpenWeatherMap["getThreeHourForecastByGeoCoordinates"]
>;
