import { useSuspenseQuery } from "@tanstack/react-query";
import { MaterialType } from "../types/MaterialType";
import { getMaterial } from "../api/material.api";

export const useGetMaterial = (id: string) => {
  return useSuspenseQuery<MaterialType[]>({
    queryKey: ["material"],
    queryFn: () => getMaterial(id),
  });
};
