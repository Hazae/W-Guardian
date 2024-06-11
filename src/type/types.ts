export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };
}

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
  weatherData: WeatherData;
  isLoading: boolean;
  error: WeatherAPIError;
}
