import { useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  margin: 10px 0 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
`;

interface DebateModalProps {
  onClose: () => void;
}

const DebateModal = ({ onClose }: DebateModalProps) => {
  const [topic, setTopic] = useState("");
  const [time, setTime] = useState("10분");
  const [side, setSide] = useState("");
  const [visibility, setVisibility] = useState("public");

  const handleCreateRoom = () => {
    console.log({ topic, time, side, visibility });
    onClose();
  };
  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>토론방 생성하기</Title>

        <Label>토론 주제</Label>
        <Input
          type="text"
          placeholder="토론 주제를 입력해주세요"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <Label>토론 시간</Label>
        <Select value={time} onChange={(e) => setTime(e.target.value)}>
          <option>10분</option>
          <option>20분</option>
          <option>30분</option>
        </Select>

        <Label>찬반 선택</Label>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              value="찬성"
              checked={side === "찬성"}
              onChange={(e) => setSide(e.target.value)}
            />
            찬성
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              value="반대"
              checked={side === "반대"}
              onChange={(e) => setSide(e.target.value)}
            />
            반대
          </RadioLabel>
        </RadioGroup>

        <Label>방 공개 설정</Label>
        <RadioGroup>
          <RadioLabel>
            <input
              type="radio"
              value="public"
              checked={visibility === "public"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            공개
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              value="private"
              checked={visibility === "private"}
              onChange={(e) => setVisibility(e.target.value)}
            />
            비공개
          </RadioLabel>
        </RadioGroup>

        <Button onClick={handleCreateRoom}>방 생성하기</Button>
      </ModalContent>
    </ModalContainer>
  );
};
export default DebateModal;
