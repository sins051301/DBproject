import { useParams } from "react-router-dom";

function useCustomParams() {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error("파람을 받지 못했습니다!");
  }
  return id;
}
export default useCustomParams;
