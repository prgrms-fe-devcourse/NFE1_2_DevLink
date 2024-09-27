import "normalize.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";
import PostModifyPage from "./pages/PostModifyPage";
import ProfilePage from "./pages/ProfilePage";
import ReduxProvider from "./features/redux/Provider";

const router = createBrowserRouter([
  // 로그인 페이지
  {
    path: "/signin",
    element: <SignInPage />,
  },
  // 회원가입 페이지
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  // 메인 페이지
  {
    path: "/",
    element: <MainPage />,
  },
  // 포스트 상세 페이지
  {
    path: "/post/:postId",
    element: <PostDetailPage />,
  },
  // 포스트 생성 페이지
  {
    path: "/post/create",
    element: <PostCreatePage />,
  },
  // 포스트 수정 페이지
  {
    path: "/post/modify/:postId",
    element: <PostModifyPage />,
  },
  // 마이페이지
  {
    path: "/profile/:userId",
    element: <ProfilePage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <RouterProvider router={router} />
      </ReduxProvider>
    </QueryClientProvider>
  </StrictMode>
);
