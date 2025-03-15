import SummaryContentItem from "./SummaryContentItem";
import { useNavigate } from "react-router-dom";
import ItemCover from "@/components/ItemCover";
import DebateReadyItem from "./DebateReadyItem";

const dummyContents = [
  {
    id: 1,
    title: "나루토 vs 사스케",
    description: "ai 기술의 발전으로 토론",
    chats: 32,
    time: 15,
  },
  {
    id: 2,
    title: "엄마 vs 아빠",
    description: "ai 기술의 발전으로 토론",
    chats: 50,
    time: 16,
  },
];

const dummyReadyDebate = [
  { id: 1, title: "남녀 갈라치기", author: "신혁수", description: "쫄?" },
  { id: 2, title: "베지터 vs 손오공", author: "안용식", description: "쫄튀?" },
];

function ChattingSummary() {
  const navigate = useNavigate();

  return (
    <>
      <ItemCover title="최근 토론 요약">
        {dummyContents.map((item) => (
          <SummaryContentItem
            onClick={() => navigate(`summary/${item.id}`)}
            key={item.title}
            title={item.title}
            description={item.description}
            time={item.time}
            chats={item.chats}
          />
        ))}
      </ItemCover>
      <ItemCover title="현재 준비된 토론들">
        {dummyReadyDebate.map((debate) => (
          <DebateReadyItem
            key={debate.id}
            title={debate.title}
            description={debate.description}
            author={debate.author}
            onClick={() => navigate(`chatting/${debate.id}`)}
          />
        ))}
      </ItemCover>
    </>
  );
}
export default ChattingSummary;
