import AnnounceItem from "@/features/announce/components/AnnounceItem";
import { useGetAnnounce } from "@/features/announce/query/announce.query";
import LectureHeader from "@/features/lecture/components/LectureHeader";
import useCustomParams from "@/hooks/useCustomParams";

function Announce() {
  const id = useCustomParams();
  const { data } = useGetAnnounce(id);
  return (
    <>
      <LectureHeader title="공지사항" />
      <AnnounceItem announcements={data} />
    </>
  );
}

export default Announce;
