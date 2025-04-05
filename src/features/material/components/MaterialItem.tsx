import styled from "styled-components";

const MaterialItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const MaterialTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #4a3aff;
`;

const MaterialDate = styled.p`
  font-size: 14px;
  color: #777;
`;

const MaterialDescription = styled.p`
  font-size: 16px;
  color: #333;
  margin-top: 8px;
`;

const MaterialImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  margin-top: 10px;
`;

interface Material {
  material_id: string;
  title: string;
  imgUrl: string;
  description: string;
  uploaded_date: string;
}

interface MaterialItemProps {
  material: Material;
}

function MaterialItem({ material }: MaterialItemProps) {
  return (
    <MaterialItemContainer>
      <MaterialTitle>{material.title}</MaterialTitle>
      <MaterialDate>
        {new Date(material.uploaded_date).toLocaleDateString()}
      </MaterialDate>
      <MaterialDescription>{material.description}</MaterialDescription>
      <MaterialImage
        src={`/src/assets/${material.imgUrl}`}
        alt={material.title}
      />
    </MaterialItemContainer>
  );
}

export default MaterialItem;
