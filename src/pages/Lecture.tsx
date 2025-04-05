import LectureHeader from "@/features/lecture/components/LectureHeader";
import { useGetLecture } from "@/features/lecture/query/lecture.query";
import useCustomParams from "@/hooks/useCustomParams";
import styled from "styled-components";

const LectureListContainer = styled.div`
  margin-top: 30px;
`;

const LectureItem = styled.div`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const LectureTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const LectureDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const LectureDate = styled.p`
  font-size: 12px;
  color: #999;
`;

const AssignmentContainer = styled.div`
  margin-top: 10px;
  padding-left: 15px;
  border-left: 2px solid #4a3aff;
`;

const AssignmentTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #4a3aff;
`;

const AssignmentDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const AssignmentDueDate = styled.p`
  font-size: 12px;
  color: #999;
`;

const AssignmentLink = styled.a`
  font-size: 14px;
  color: #4a3aff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Lecture() {
  const id = useCustomParams();
  const { data } = useGetLecture(id);

  return (
    <>
      <LectureHeader title="강의 개요" />
      <LectureListContainer>
        {data.map((lecture) => {
          return (
            <LectureItem key={lecture.lecture_title}>
              <LectureTitle>{lecture.lecture_title}</LectureTitle>
              <LectureDescription>
                {lecture.lecture_description}
              </LectureDescription>
              <LectureDate>
                {new Date(lecture.lecture_date).toLocaleString()}
              </LectureDate>
              {lecture.assignments &&
                lecture.assignments.map((assignment) => (
                  <AssignmentContainer>
                    <AssignmentTitle>{assignment.title}</AssignmentTitle>
                    <AssignmentDescription>
                      {assignment.description}
                    </AssignmentDescription>
                    <AssignmentDueDate>
                      마감일: {new Date(assignment.due_date).toLocaleString()}
                    </AssignmentDueDate>
                    <AssignmentLink href="#">과제 관련 링크</AssignmentLink>
                  </AssignmentContainer>
                ))}
            </LectureItem>
          );
        })}
      </LectureListContainer>
    </>
  );
}

export default Lecture;
