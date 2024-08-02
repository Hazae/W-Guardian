import { useCurrentLocation } from "@/hooks/useGeoLocation";
import { useWeathers } from "@/hooks/useWeather";
import styled from "styled-components";
import Header from "./header";
import useClosestWeather from "@/hooks/useClosestWeather";
import { useEffect, useState } from "react";
import { WeatherForecastResponse } from "@/type/types";

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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [filteredWeather, setFilteredWeather] = useState<
    WeatherForecastResponse["list"] | null
  >(null);

  useEffect(() => {
    if (data && closestWeather) {
      const dtTime = closestWeather.dt_txt.split(" ")[1];
      const filtered = data.list.filter((item) => item.dt_txt.includes(dtTime));
      setFilteredWeather(filtered);
    }
  }, [data, closestWeather]);

  // 초기 렌더링 시 0번째 Box 컴포넌트에 포커싱
  useEffect(() => {
    if (filteredWeather && filteredWeather.length > 0) {
      setFocusedIndex(0);
    }
  }, [filteredWeather]);

  console.log(filteredWeather);

  const todayText: string[] = ["오늘", "내일", "모레", "글피"];
  const thermoScale: number[] = [1, 2, 3, 4, 5, 6, 7];

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;

  return (
    <>
      <Header $textcolor={closestWeather?.weather[0].icon as string} />
      <WeekCon>
        {filteredWeather?.slice(0, 4).map((item, index) => (
          <Box
            key={item.dt}
            className={`box ${index === focusedIndex ? "focused" : ""} ${
              focusedIndex === 0 && index !== 0 ? "shifted" : ""
            }`}
            onClick={(e) => {
              const boxes = document.querySelectorAll(".box");
              boxes.forEach((box) =>
                box.classList.remove("focused", "shifted")
              );
              e.currentTarget.classList.add("focused");
              setFocusedIndex(index);
            }}
            $bgcolor={item.weather[0].icon}
            $idx={index}
          >
            <div className="today-text">
              <p className="kr">{todayText[index]}</p>
            </div>
            <div className="temp-text">{Math.round(item.main.temp)}°</div>
            <div className="icon-box">
              <img
                src={`/img/${item.weather[0].icon}.png`}
                alt={`${item.weather[0].description}`}
                loading="lazy"
              ></img>
            </div>
            <div className="week-description kr">
              {(() => {
                if (item.weather[0].description.includes("튼"))
                  return item.weather[0].description.replace("튼", "");
                else if (item.weather[0].description.includes("온"))
                  return item.weather[0].description.replace("온", "");
                else if (item.weather[0].description.includes("실"))
                  return item.weather[0].description.replace("실", "약한");
                else if (
                  item.weather[0].description.includes("약간의 구름이 낀 하늘")
                )
                  return item.weather[0].description.replace(
                    "약간의 구름이 낀 하늘",
                    "약간 흐림"
                  );
                else if (item.weather[0].description.includes("박무"))
                  return item.weather[0].description.replace("박무", "안개");
                else return item.weather[0].description;
              })()}
            </div>
            <div className="temp-max-min-box">
              <p className="temp-max-text">
                최고기온 {Math.round(item.main.temp_max)}°
              </p>
              <div className="thermometer">
                <div
                  className="temp-max"
                  style={{ height: `${item.main.temp_max * 2 + 10}%` }}
                ></div>
                <div
                  className="temp-min"
                  style={{ height: `${item.main.temp_min * 2}%` }}
                ></div>
                {thermoScale.map((item, idx) => (
                  <div
                    key={idx}
                    className="thermo-scale"
                    style={{ top: `${item * 13}%` }}
                  />
                ))}
              </div>
              <p className="temp-min-text">
                최저기온 {Math.round(item.main.temp_min)}°
              </p>
            </div>
          </Box>
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

const Box = styled.div<{ $bgcolor: string; $idx: number }>`
  width: 37%;
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

  .today-text,
  .temp-text {
    font-size: 1.5em;
    color: ${(props) => (props.$bgcolor.includes("n") ? "#fff" : "#233947")};
    text-align: center;
    margin: 5vh auto;
  }

  .temp-text {
    font-size: 1.7em;
  }

  .icon-box {
    width: 80%;
    margin: 10vh auto 2vh;
    filter: blur(2px);
    -webkit-filter: blur(2px);

    img {
      height: 9vh;
      margin: 0 auto;
    }
  }

  .week-description {
    text-align: center;
    padding: 5%;
    margin: 5% auto;
    width: 90%;
    background-color: rgba(255, 255, 255, 0.3);
  }

  &.focused {
    left: ${(props) => (props.$idx === 0 ? props.$idx : props.$idx * 25 - 11)}%;

    .icon-box {
      filter: blur(0px);
      -webkit-filter: blur(0px);
    }

    .week-description {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  &.shifted {
    left: ${(props) => props.$idx * 25 + 10}%;
  }

  .temp-max-text,
  .temp-min-text {
    color: ${(props) => (props.$bgcolor.includes("n") ? "#fff" : "#233947")};
    text-align: center;
    margin: 6vh auto;
  }

  .thermometer {
    width: 5vw;
    height: 25vh;
    background-color: white;
    margin: 0 auto;
    border-radius: 20px;
    border: 0.5px solid gray;
    position: relative;

    .thermo-scale {
      position: absolute;
      left: 0;
      width: 70%;
      height: 1px;
      background-color: gray;
    }

    .temp-max,
    .temp-min {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 20px;
    }

    .temp-max {
      background-color: #cc3216;
    }

    .temp-min {
      background-color: #094063;
    }
  }
`;

export default Week;
