import { useEffect, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import ResultModal from "@/features/chatting/ResultModal";

const Container = styled.div`
  width: 60%;
  min-height: 90vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 1%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
`;

const Title = styled.h2`
  margin: 0;
`;

const Timer = styled.span`
  font-size: 16px;
`;

const EndButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Messages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #fafafa;
`;

const Message = styled.div<{ isMine: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
  margin: 5px 0;

  span {
    font-size: 12px;
    color: gray;
  }

  p {
    background-color: ${(props) => (props.isMine ? "#dcf8c6" : "white")};
    padding: 8px;
    border-radius: 8px;
    max-width: 60%;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 50px;
`;

const SendButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  margin-left: 5px;
`;

const socket = io("http://localhost:4000");

const ChatRoom = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      const message = { user: "나", text: input };
      socket.emit("message", message);
      setMessages((prev) => [...prev, message]);
      setInput("");
    }
  };

  return (
    <Container>
      <Header>
        <Title>토론 주제: 나루토 vs 지라이야</Title>
        <Timer>29:59</Timer>
        <EndButton onClick={() => setShowModal(true)}>토론 종료</EndButton>
      </Header>
      <Messages>
        {messages.map((msg, index) => (
          <Message key={index} isMine={msg.user === "나"}>
            <span>{msg.user}</span>
            <p>{msg.text}</p>
          </Message>
        ))}
      </Messages>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="의견을 입력하세요..."
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
        {showModal && <ResultModal onClose={() => setShowModal(false)} />}
      </InputContainer>
    </Container>
  );
};

export default ChatRoom;
