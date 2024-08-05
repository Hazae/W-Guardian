import { useCurrentLocation } from "@/hooks/useGeoLocation";
import { useWeathers } from "@/hooks/useWeather";
import styled from "styled-components";
import Header from "./header";
import useClosestWeather from "@/hooks/useClosestWeather";
import { useCallback, useMemo, useState } from "react";
import WeekBox from "@/components/week-box";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 1, // 1시간
};

const Week: React.FC = () => {
  const { loc } = useCurrentLocation(geolocationOptions);
  const { data, isLoading, error } = useWeathers(loc?.latitude, loc?.longitude);
  const closestWeather = useClosestWeather(data);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // 데이터가 변경되면 filteredWeather도 새로 필터링
  const filteredWeather = useMemo(() => {
    if (data && closestWeather) {
      const dtTime = closestWeather.dt_txt.split(" ")[1];
      return data.list.filter((item) => item.dt_txt.includes(dtTime));
    }
    return [];
  }, [data, closestWeather]);

  const handleFocusChange = useCallback((index: number) => {
    setFocusedIndex(index);
  }, []);

  // 할 일: 최고/최저 기온 data에서 같은 날짜라면 다 뒤져서 뭐가 큰 지 비교한 뒤에 UI에 반영

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  if (data && closestWeather)
    return (
      <>
        <Header $textcolor={closestWeather?.weather[0].icon as string} />
        <WeekCon>
          {filteredWeather.slice(0, 4).map((item, index) => (
            <WeekBox
              key={item.dt}
              item={item}
              index={index}
              focusedIndex={focusedIndex}
              setFocusedIndex={handleFocusChange}
            />
          ))}
        </WeekCon>
      </>
    );
};

const WeekCon = styled.main`
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
  position: relative;
  overflow: hidden;
`;

export default Week;
