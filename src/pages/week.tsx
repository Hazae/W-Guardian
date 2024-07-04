import { useCurrentLocation } from "@/hooks/useGeoLocation";
import { useWeathers } from "@/hooks/useWeather";
import styled from "styled-components";
import Header from "./header";
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
    console.log(closestWeather);

    const dtTime = closestWeather?.dt_txt.split(" ")[1] as string;

    const filteredWeather = data.list.filter((item) =>
      item.dt_txt.includes(dtTime)
    );

    return (
      <>
        <Header $textcolor={closestWeather?.weather[0].icon as string} />
        <WeekCon>
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
              $idx={index}
            >
              <div className="date-text"></div>
              <div className="temp-text">{Math.round(item.main.temp)}°</div>
              <div className="icon-box">
                <img
                  src={`/img/${item.weather[0].icon}.png`}
                  alt={`${item.weather[0].description}`}
                  loading="lazy"
                ></img>
              </div>
              <div className="week-description">
                {(() => {
                  if (item.weather[0].description.includes("튼"))
                    return item.weather[0].description.replace("튼", "");
                  else if (item.weather[0].description.includes("온"))
                    return item.weather[0].description.replace("온", "");
                  else if (item.weather[0].description.includes("실"))
                    return item.weather[0].description.replace("실", "약한");
                  else if (
                    item.weather[0].description.includes(
                      "약간의 구름이 낀 하늘"
                    )
                  )
                    return item.weather[0].description.replace(
                      "약간의 구름이 낀 하늘",
                      "약간 흐림"
                    );
                  else return item.weather[0].description;
                })()}
              </div>
            </Box>
          ))}
        </WeekCon>
      </>
    );
  }
};

const WeekCon = styled.div`
  width: 100vw;
  height: 100vh;
  font-size: 1rem;
  position: relative;
  // display: flex;
`;

const Box = styled.div<{ $bgcolor: string; $idx: number }>`
  width: 35%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: ${(props) => props.$idx * 25}%;
  transition: left 0.3s ease;
  background-color: ${(props) =>
    (bgBright.includes(props.$bgcolor) && "#f6e8cf") ||
    (bgCloudy.includes(props.$bgcolor) && "#dbe1da") ||
    "#233947"};
  box-shadow: 10px 0px 20px 2px rgba(0, 0, 0, 0.2);
  padding-top: 10%;

  .week-description {
    text-align: center;
    padding: 5%;
    margin: 5% auto;
    width: 90%;
    background-color: rgba(255, 255, 255, 0.3);
  }

  &.focused {
    // width: 60%;
    left: ${(props) => props.$idx * 25 - 10}%;

    // .icon-box {
    //   width: 80%;
    //   margin: 0 auto;
    // }

    .week-description {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export default Week;
