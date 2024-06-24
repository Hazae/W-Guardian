import { useCurrentLocation } from "@/hooks/useGeoLocation";
import { useWeathers } from "@/hooks/useWeather";
import styled from "styled-components";
import Header from "./header";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 1, // 1시간
};

const Week: React.FC = () => {
  const { loc } = useCurrentLocation(geolocationOptions);
  const { data, isLoading, error } = useWeathers(loc?.latitude, loc?.longitude);

  if (data) {
    return (
      <WeekCon>
        {/* <Header /> */}
        <div>
          {data.list.map((item) => (
            <>
              <div>날짜: {item.dt_txt}</div>
              <div>날씨: {item.weather[0].description}</div>
            </>
          ))}
        </div>
      </WeekCon>
    );
  }
};

const WeekCon = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
`;

export default Week;
