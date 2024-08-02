import styled from "styled-components";
import { WeatherProps } from "../type/types";
import { fetchGeocode } from "@/api/city-local-name";
import { useQuery } from "react-query";

const CityName: React.FC<WeatherProps> = ({
  weatherData,
  isLoading,
  error,
}) => {
  const { data: city } = useQuery(
    ["geocode", weatherData?.name],
    async () => {
      try {
        return await fetchGeocode(weatherData?.name);
      } catch (err) {
        throw new Error("Geocode fetch failed");
      }
    },
    {
      enabled: !!weatherData?.name, // weatherData.name이 존재할 때만 쿼리 실행
      retry: 1,
      staleTime: 1000 * 60,
      cacheTime: 1000 * 600, // 10 min
    }
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return <CityNameCon className="kr">{city}</CityNameCon>;
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
