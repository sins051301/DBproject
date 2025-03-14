import styled from "styled-components";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #ddd;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 10px auto;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #333;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
`;

const SubText = styled.p`
  font-size: 14px;
  color: #888;
  margin-top: 5px;
  text-align: center;
`;

function Loading() {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>데이터를 불러오는 중</LoadingText>
      <SubText>
        <br />
        잠시만 기다려주세요... <br /> <br />
        열심히 불러오고 있습니다 🚀{" "}
      </SubText>
    </LoadingContainer>
  );
}

export default Loading;
