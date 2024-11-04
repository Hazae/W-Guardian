import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_KEY;

export const fetchGeocode = async (
  city: string | undefined
): Promise<string> => {
  const response = await axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    )
    .then((res) => {
      return res.data[0];
    })
    .catch((err) => console.log(err));

  const localName = response?.local_names.ko as string;

  if (!localName) {
    throw new Error("Korean local name not found in the geocode data");
  }

  return localName;
};
