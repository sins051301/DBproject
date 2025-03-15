import { Outlet } from "react-router-dom";
import styled from "styled-components";

import QueryErrorBoundary from "@/services/QueryErrorBoundary";
import { Suspense } from "react";
import Loading from "@/pages/Loading";
import Header from "./Header";
import Footer from "./Footer";

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function CommonLayout() {
  return (
    <Background>
      <Header />
      <QueryErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </QueryErrorBoundary>
      <Footer />
    </Background>
  );
}

export default CommonLayout;
