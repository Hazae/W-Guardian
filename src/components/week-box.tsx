import { WeekBoxProps } from "@/type/types";
import styled from "styled-components";
import TempMaxMin from "./temp-max-min";

const bgBright = ["01d", "02d", "50d"];
const bgCloudy = ["03d", "04d", "10d", "11d"];
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
`;

const WeekBox: React.FC<WeekBoxProps> = ({
  item,
  index,
  focusedIndex,
  setFocusedIndex,
}) => {
  const todayText: string[] = ["오늘", "내일", "모레", "글피"];

  console.log(item);

  return (
    <Box
      key={item.dt}
      className={`box ${index === focusedIndex ? "focused" : ""} ${
        focusedIndex === 0 && index !== 0 ? "shifted" : ""
      }`}
      onClick={(e) => {
        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => box.classList.remove("focused", "shifted"));
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
      <TempMaxMin
        tempMax={item.main.temp_max}
        tempMin={item.main.temp_min}
        bgColor={item.weather[0].icon}
      />
    </Box>
  );
};

export default WeekBox;
