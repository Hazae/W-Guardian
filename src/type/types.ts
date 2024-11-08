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

export type WeatherForecastResponse = Awaited<
  ReturnType<OpenWeatherMap["getThreeHourForecastByGeoCoordinates"]>
>;

export type WeatherForecastList = Pick<WeatherForecastResponse, "list">["list"];

export type WeekBoxProps = {
  item: WeatherForecastList[number];
  index: number;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  dailyTemp: {
    date: string;
    tempMax: number;
    tempMin: number;
  }[];
};

export type TempMaxMinProps = {
  tempMax: number;
  tempMin: number;
  bgColor: string;
};
