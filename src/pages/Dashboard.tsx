import styled from "styled-components";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ItemCover from "@/components/ItemCover";
import SummaryContentItem from "@/features/home/components/summary/SummaryContentItem";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  background: white;
  width: 83%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ChartBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const dummyData = [
  { month: "1월", 참여: 20, 승리: 15 },
  { month: "2월", 참여: 25, 승리: 18 },
  { month: "3월", 참여: 30, 승리: 20 },
  { month: "4월", 참여: 35, 승리: 22 },
  { month: "5월", 참여: 40, 승리: 25 },
  { month: "6월", 참여: 50, 승리: 30 },
];

const expData = [
  { month: "1월", 경험치: 1000 },
  { month: "2월", 경험치: 2500 },
  { month: "3월", 경험치: 4000 },
  { month: "4월", 경험치: 7000 },
  { month: "5월", 경험치: 11000 },
  { month: "6월", 경험치: 16000 },
];

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

function Dashboard() {
  const navigate = useNavigate();
  return (
    <Container>
      <ProfileCard>
        <Avatar src="https://via.placeholder.com/60" alt="Profile" />
        <div>
          <h3>김토론</h3>
          <p>토론 전문가 | 경험치 15,420 | 팔로워 1.2k</p>
        </div>
      </ProfileCard>

      <StatsContainer>
        <ChartBox>
          <h4>토론 활동 통계</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dummyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="참여" fill="#8884d8" />
              <Bar dataKey="승리" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox>
          <h4>경험치 획득 추이</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={expData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="경험치"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </StatsContainer>
      <ItemCover title="최근 토론 요약">
        {dummyContents.map((item) => (
          <SummaryContentItem
            onClick={() => navigate(`/summary/${item.id}`)}
            key={item.title}
            title={item.title}
            description={item.description}
            time={item.time}
            chats={item.chats}
          />
        ))}
      </ItemCover>
    </Container>
  );
}

export default Dashboard;
