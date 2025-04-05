import { useSuspenseQuery } from "@tanstack/react-query";
import { AnnounceType } from "../types/AnnounceType";
import { getAnnounce } from "../api/announce.api";

export const useGetAnnounce = (id: string) => {
  return useSuspenseQuery<AnnounceType[]>({
    queryKey: ["announce"],
    queryFn: () => getAnnounce(id),
  });
};
