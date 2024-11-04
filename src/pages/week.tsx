import { useCurrentLocation } from "@/hooks/useGeoLocation";
import { useWeathers } from "@/hooks/useWeather";
import styled from "styled-components";
// import Header from "./header";
import useClosestWeather from "@/hooks/useClosestWeather";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10, // 10초
  maximumAge: 1000 * 3600 * 1, // 1시간
};

const bgBright = ["01d", "02d", "50d"];
const bgCloudy = ["03d", "04d", "10d", "11d"];

const Week: React.FC = () => {
  const { loc } = useCurrentLocation(geolocationOptions);
  const { data, isLoading, error } = useWeathers(loc?.latitude, loc?.longitude);
  const closestWeather = useClosestWeather(data);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  if (data) {
    console.log(data);
    console.log(closestWeather);

    const dtTime = closestWeather?.dt_txt.split(" ")[1] as string;

    const filteredWeather = data.list.filter((item) =>
      item.dt_txt.includes(dtTime)
    );

    return (
      <WeekCon>
        {/* <Header /> */}
        {/* 터치 애니메이션 구현하기 */}
        {filteredWeather.slice(0, 4).map((item, index) => (
          <Box
            key={item.dt}
            className={`box ${index === 0 ? "focused" : ""}`}
            onClick={(e) => {
              const boxes = document.querySelectorAll(".box");
              boxes.forEach((box) => box.classList.remove("focused"));
              e.currentTarget.classList.add("focused");
            }}
            $bgcolor={item.weather[0].icon}
          >
            <div>날짜: {item.dt_txt}</div>
            <div>날씨: {item.weather[0].description}</div>
          </Box>
        ))}
      </WeekCon>
    );
  }
};

const WeekCon = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
  display: flex;
`;

const Box = styled.div<{ $bgcolor: string }>`
  width: 20%;
  transition: width 0.3s ease;
  background-color: ${(props) =>
    (bgBright.includes(props.$bgcolor) && "#f6e8cf") ||
    (bgCloudy.includes(props.$bgcolor) && "#dbe1da") ||
    "#233947"};
  box-shadow: 10px 0px 20px 2px rgba(0, 0, 0, 0.2);

  &.focused {
    width: 40%;
  }
`;

export default Week;
