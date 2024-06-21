import { Link } from "react-router-dom";
import styled from "styled-components";

const bgBright = ["01d", "02d", "50d"];
const bgCloudy = ["03d", "04d", "10d", "11d"];

const Header: React.FC<{ $textcolor: string }> = ({ $textcolor }) => {
  return (
    <HeaderCon $textcolor={$textcolor}>
      <nav>
        <Link to="/">HOME</Link>
        <Link to="/week">WEEK</Link>
      </nav>
    </HeaderCon>
  );
};

const HeaderCon = styled.header<{ $textcolor: string }>`
  padding-top: 1.25rem;
  margin-left: 5%;

  & nav {
    display: flex;
    gap: 1.5rem;

    & a {
      text-decoration: underline;
      color: ${(props) =>
        (bgBright.includes(props.$textcolor) && "#233947") ||
        (bgCloudy.includes(props.$textcolor) && "#233947") ||
        "#dbe1da"};
    }
  }
`;

export default Header;
