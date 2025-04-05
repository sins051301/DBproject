import styled from "styled-components";

const AnnounceContainer = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const AnnounceItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const AnnounceTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #4a3aff;
`;

const AnnounceDate = styled.p`
  font-size: 14px;
  color: #777;
`;

const AnnounceContent = styled.p`
  font-size: 16px;
  color: #333;
  margin-top: 8px;
`;

interface Announcement {
  announcement_id: string;
  title: string;
  created_at: string;
  content: string;
}

interface AnnounceProps {
  announcements: Announcement[];
}

function AnnounceItem({ announcements }: AnnounceProps) {
  return (
    <AnnounceContainer>
      {announcements.map((announcement) => (
        <AnnounceItemContainer key={announcement.announcement_id}>
          <AnnounceTitle>{announcement.title}</AnnounceTitle>
          <AnnounceDate>
            {new Date(announcement.created_at).toLocaleDateString()}
          </AnnounceDate>
          <AnnounceContent>{announcement.content}</AnnounceContent>
        </AnnounceItemContainer>
      ))}
    </AnnounceContainer>
  );
}

export default AnnounceItem;
