import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import CommonLayout from "./layouts/CommonLayout";
import { queryClient } from "./services/TanstackQueryStore";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Lecture from "./pages/Lecture";
import Syllabus from "./pages/Syllabus";
import Announce from "./pages/Announce";
import Material from "./pages/Material";
import Grade from "./pages/Grade";
import Comments from "./pages/Comments";
import Course from "./features/course/components/Course";

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
        path: "course/my",
        element: <Course isMyCourse />,
      },
      {
        path: "course/:id",
        children: [
          { path: "", element: <Lecture /> },
          { path: "announce", element: <Announce /> },
          { path: "syllabus", element: <Syllabus /> },
          { path: "material", element: <Material /> },
          { path: "comments", element: <Comments /> },
          { path: "grade", element: <Grade /> },
        ],
      },
    ],
  },
  { path: "login", element: <Login /> },
  {
    path: "/signup",
    element: <Signup />,
  },
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
