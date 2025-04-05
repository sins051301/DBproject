import GradeItem from "@/features/grade/components/GradeItem";
import { useGetGrade } from "@/features/grade/query/grade.query";
import LectureHeader from "@/features/lecture/components/LectureHeader";
import useCustomParams from "@/hooks/useCustomParams";

function Grade() {
  const id = useCustomParams();
  const { data } = useGetGrade(id);
  return (
    <>
      <LectureHeader title="성적 조회" />
      {data.map((member) => (
        <GradeItem key={member.member_id} member={member} />
      ))}
    </>
  );
}

export default Grade;
