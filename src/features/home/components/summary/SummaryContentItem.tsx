import styled from "styled-components";
import ChatLogo from "@/assets/chats.svg?react";
import TimeLogo from "@/assets/time.svg?react";

const SummaryItemContainer = styled.div`
  border-top: solid #e5e7eb;
  cursor: pointer;
`;

const SummaryItemTitle = styled.h1`
  color: #111827;
  font-size: 0.8rem;
  font-weight: bold;
  text-indent: 8px;
`;

const SummaryDescription = styled.p`
  font-weight: normal;
  color: #6b7280;
  font-size: 0.7rem;
  text-indent: 8px;
`;

const SummaryInfo = styled.div`
  font-weight: normal;
  color: #6b7280;
  gap: 10px;
  font-size: 0.7rem;
  text-indent: 8px;
  margin-bottom: 10px;
`;

interface SummaryContentItemProps {
  title: string;
  description: string;
  chats: number;
  time: number;
  onClick: () => void;
}

function SummaryContentItem({
  title,
  description,
  chats,
  time,
  onClick,
}: SummaryContentItemProps) {
  return (
    <SummaryItemContainer onClick={onClick}>
      <SummaryItemTitle>{title}</SummaryItemTitle>
      <SummaryDescription>{description}</SummaryDescription>
      <SummaryInfo>
        <ChatLogo style={{ width: "10px", height: "10px" }} /> {chats}개{" "}
        <TimeLogo style={{ width: "10px", height: "10px" }} /> {time}분 전
      </SummaryInfo>
    </SummaryItemContainer>
  );
}
export default SummaryContentItem;
