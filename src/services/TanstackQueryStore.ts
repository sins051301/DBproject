import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60,
      gcTime: 30 * 1000 * 60,
      throwOnError: true,
      notifyOnChangeProps: ["data"],
    },
  },
});
