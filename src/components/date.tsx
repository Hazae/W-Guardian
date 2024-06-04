import styled from "styled-components";

const TodayDate: React.FC = () => {
  const wholeDate = new Date();
  const year = wholeDate.getFullYear();
  const month =
    wholeDate.getMonth() + 1 > 10
      ? wholeDate.getMonth() + 1
      : `0${wholeDate.getMonth() + 1}`;
  const date =
    wholeDate.getDate() < 10 ? `0${wholeDate.getDate()}` : wholeDate.getDate();

  return (
    <DateCon>
      {year}.{month}.{date}
    </DateCon>
  );
};

const DateCon = styled.div`
  font-size: 1.5rem;
  position: absolute;
  top: 3rem;
  left: 1.25rem;
  background-color: #fff;
  text-align: center;
  line-height: 2rem;
  padding: 0.15rem;
`;

export default TodayDate;
