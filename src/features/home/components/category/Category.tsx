import styled from "styled-components";
import DebateModal from "../DebateModal";
import { useState } from "react";

const CategorySection = styled.aside`
  width: 15vw;
  display: flex;
  flex-direction: column;
`;

const CategoryContents = styled.div`
  background-color: rgba(0, 0, 0, 0);
  border: solid #e5e7eb;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const CategorySelectButton = styled.button`
  font-size: 0.7rem;
  text-indent: 8px;
  border: none;
  text-align: left;
  margin-bottom: 5px;
  padding: 1%;
  background-color: rgba(0, 0, 0, 0);
  :focus {
    background-color: #4b5563;
  }
`;
const CategoryTitle = styled.p`
  color: #111827;
  font-size: 0.7rem;
  font-weight: bold;
  text-indent: 8px;
  padding-bottom: 10px;
  border-bottom: solid #e5e7eb;
`;

const CategoryCreateButton = styled.button`
  background-color: #000000;
  color: white;
  font-size: 0.6rem;
  height: 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const dummyCategory = [
  "시사/정치",
  "과학/기술",
  "문화/예술",
  "스포츠",
  "경제",
  "교육",
];

function Category() {
  const [showModal, setShowModal] = useState(false);

  return (
    <CategorySection>
      <CategoryContents>
        <CategoryTitle>카테고리</CategoryTitle>
        {dummyCategory.map((item) => (
          <CategorySelectButton key={item}>{item}</CategorySelectButton>
        ))}
      </CategoryContents>
      <CategoryCreateButton onClick={() => setShowModal(true)}>
        + 새 토론 만들기
      </CategoryCreateButton>
      {showModal && <DebateModal onClose={() => setShowModal(false)} />}
    </CategorySection>
  );
}
export default Category;
