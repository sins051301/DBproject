import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import CommonLayout from "./layouts/CommonLayout";
import { queryClient } from "./services/TanstackQueryStore";
import Login from "./pages/Login";
import SummaryDetail from "./pages/SummaryDetail";
import ChatRoom from "./pages/ChatRoom";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/summary/:id",
        element: <SummaryDetail />,
      },
      { path: "/chatting/:id", element: <ChatRoom /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
  { path: "login", element: <Login /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
