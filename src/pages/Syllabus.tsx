import LectureHeader from "@/features/lecture/components/LectureHeader";
import { useGetSyllabus } from "@/features/syllabus/query/syllabus.query";
import useCustomParams from "@/hooks/useCustomParams";
import styled from "styled-components";

const CoursePlanContainer = styled.div`
  margin-top: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CoursePlanSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const SectionContent = styled.p`
  font-size: 14px;
  color: #666;
`;

const GradingPolicy = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

function Syllabus() {
  const id = useCustomParams();
  console.log(id);
  const { data } = useGetSyllabus(id);

  return (
    <>
      <LectureHeader title="강의 계획서" />

      <CoursePlanContainer>
        <CoursePlanSection>
          <SectionTitle>강의 설명</SectionTitle>
          <SectionContent>{data.description}</SectionContent>
        </CoursePlanSection>

        <CoursePlanSection>
          <SectionTitle>목표</SectionTitle>
          <SectionContent>{data.objectives}</SectionContent>
        </CoursePlanSection>

        <CoursePlanSection>
          <SectionTitle>강의 일정</SectionTitle>
          <SectionContent>{data.schedule}</SectionContent>
        </CoursePlanSection>

        <CoursePlanSection>
          <SectionTitle>성적 기준</SectionTitle>
          <GradingPolicy>{data.grading_policy}</GradingPolicy>
        </CoursePlanSection>
      </CoursePlanContainer>
    </>
  );
}

export default Syllabus;
