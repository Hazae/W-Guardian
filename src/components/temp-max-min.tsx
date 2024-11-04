import styled from "styled-components";
import { TempMaxMinProps } from "@/type/types";

// 할 일: 최고/최저 기온 data에서 같은 날짜라면 다 뒤져서 뭐가 큰 지 비교한 뒤에 UI에 반영
const TempMaxMin: React.FC<TempMaxMinProps> = ({
  tempMax,
  tempMin,
  bgColor,
}) => {
  const thermoScale: number[] = [1, 2, 3, 4, 5, 6, 7];

  return (
    <TempMaxMinCon $bgcolor={bgColor}>
      <p className="temp-max-text">최고기온 {Math.round(tempMax)}°</p>
      <div className="thermometer">
        <div
          className="temp-max"
          style={{ height: `${tempMax * 2 + 10}%` }}
        ></div>
        <div
          className="temp-min"
          style={{ height: `${tempMin * 2 + 6}%` }}
        ></div>
        {thermoScale.map((e, idx) => (
          <div
            key={idx}
            className="thermo-scale"
            style={{ top: `${e * 13}%` }}
          />
        ))}
      </div>
      <p className="temp-min-text">최저기온 {Math.round(tempMin)}°</p>
    </TempMaxMinCon>
  );
};

const TempMaxMinCon = styled.div<{ $bgcolor: string }>`
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

export default TempMaxMin;
