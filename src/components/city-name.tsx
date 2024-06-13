import styled from "styled-components";
import { WeatherProps } from "../type/types";

const CityName: React.FC<WeatherProps> = ({
  weatherData,
  isLoading,
  error,
}) => {
  let city = "";

  if (weatherData?.name.includes("-si"))
    city = weatherData?.name.replace("-si", "");
  else if (weatherData?.name.includes("-dong"))
    city = weatherData?.name.replace("-dong", "");

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return <CityNameCon>{city}</CityNameCon>;
};

const CityNameCon = styled.div`
  font-size: 1.5rem;
  background-color: #fff;
  text-align: center;
  padding: 0.15rem;
  color: #233947;
  width: 80%;
`;

export default CityName;
