import LectureHeader from "@/features/lecture/components/LectureHeader";
import MaterialItem from "@/features/material/components/MaterialItem";
import { useGetMaterial } from "@/features/material/query/material.query";
import useCustomParams from "@/hooks/useCustomParams";

function Material() {
  const id = useCustomParams();
  const { data } = useGetMaterial(id);
  return (
    <>
      <LectureHeader title="학습 자료" />
      {data.map((material) => (
        <MaterialItem key={material.material_id} material={material} />
      ))}
    </>
  );
}

export default Material;
