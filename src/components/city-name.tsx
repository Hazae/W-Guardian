import styled from "styled-components";
import GetWeather from "@/components/weather-data";

const CityName: React.FC = () => {
  const data = GetWeather();

  return <CityNameCon>city: {data?.name}</CityNameCon>;
};

const CityNameCon = styled.div`
  font-size: 1.5rem;
  position: absolute;
  top: 4.5rem;
  left: 1.25rem;
  background-color: #fff;
  text-align: center;
  line-height: 2rem;
  padding: 0.15rem;
`;

export default CityName;
