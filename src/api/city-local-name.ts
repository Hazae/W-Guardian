import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_KEY;

export const fetchGeocode = async (
  city: string | undefined
): Promise<string> => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  );

  const localName = response.data[0]?.local_names.ko;

  if (!localName) {
    throw new Error("Korean local name not found in the geocode data");
  }

  return localName;
};
