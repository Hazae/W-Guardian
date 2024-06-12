interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Weather[];
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
  weatherData: WeatherData | undefined;
  isLoading: boolean;
  error: WeatherAPIError | null;
}
