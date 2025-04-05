import styled from "styled-components";
import TimeLogo from "@/assets/time.svg?react";

const CourseItemContainer = styled.div`
  border-top: solid #e5e7eb;
  cursor: pointer;
  margin-bottom: 30px;
`;

const CourseTitle = styled.h1`
  color: #111827;
  font-size: 0.8rem;
  font-weight: bold;
  text-indent: 8px;
`;

const CourseDescription = styled.p`
  font-weight: normal;
  color: #6b7280;
  font-size: 0.7rem;
  text-indent: 8px;
`;

const CourseInfo = styled.div`
  font-weight: normal;
  color: #6b7280;
  gap: 10px;
  font-size: 0.7rem;
  text-indent: 8px;
  margin-bottom: 10px;
`;

const CourseImage = styled.img`
  width: 50%;
  height: auto;

  object-fit: cover;
`;

interface CourseProps {
  title: string;
  description: string;
  time: string;
  image: string;
  onClick: () => void;
}

function CourseList({ title, description, time, image, onClick }: CourseProps) {
  return (
    <CourseItemContainer onClick={onClick}>
      <CourseImage src={`/src/assets/${image}`} alt={title} />
      <CourseTitle>{title}</CourseTitle>
      <CourseDescription>{description}</CourseDescription>
      <CourseInfo>
        <TimeLogo style={{ width: "10px", height: "10px" }} /> {time}
      </CourseInfo>
    </CourseItemContainer>
  );
}

export default CourseList;
