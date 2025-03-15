import styled from "styled-components";

const SummaryItemContainer = styled.div`
  border-top: solid #e5e7eb;
  cursor: pointer;
`;

const SummaryItemTitle = styled.h1`
  color: #111827;
  font-size: 0.9rem;
  font-weight: bold;
  text-indent: 8px;
`;

const SummaryDescription = styled.p`
  font-weight: normal;
  color: #6b7280;
  font-size: 0.75rem;
  text-indent: 8px;
`;

const SummaryInfo = styled.div`
  font-weight: normal;
  color: #6b7280;
  font-size: 0.65rem;
  text-indent: 8px;
  margin-bottom: 10px;
`;

interface DebateReadyItemProps {
  title: string;
  description: string;
  author: string;
  onClick: () => void;
}

function DebateReadyItem({
  title,
  description,
  author,
  onClick,
}: DebateReadyItemProps) {
  return (
    <SummaryItemContainer onClick={onClick}>
      <SummaryItemTitle>{title}</SummaryItemTitle>
      <SummaryDescription>{description}</SummaryDescription>
      <SummaryInfo>작성자: {author}</SummaryInfo>
    </SummaryItemContainer>
  );
}
export default DebateReadyItem;
