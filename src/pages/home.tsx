import styled from "styled-components";
import CityName from "@/components/city-name";

const Home = () => {
  return (
    <Container className="mx-auto my-auto">
      <CityName />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f6e8c1;
  font-size: 1rem;
`;

export default Home;
