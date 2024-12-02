import styled from "styled-components";

const Loader = styled.div`
  background-color: #d9e4ff;

  .right {
    animation-delay: 0.5s;
  }
`;

const Loading: React.FC = () => {
  return (
    <Loader id="loader" className="flex h-screen items-center justify-center">
      <div className="left w-1/4 animate-bounce">
        <img src="img/loader-left.png" alt="로딩 이미지" />
      </div>
      <div className="right w-1/4 animate-bounce">
        <img src="img/loader-right.png" alt="로딩 이미지" />
      </div>
    </Loader>
  );
};

export default Loading;
