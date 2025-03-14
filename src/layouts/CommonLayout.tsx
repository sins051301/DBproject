import { Outlet } from "react-router-dom";
import styled from "styled-components";

import QueryErrorBoundary from "@/services/QueryErrorBoundary";
import { Suspense } from "react";
import Loading from "@/pages/Loading";

const Background = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContents = styled.div`
  width: 100%;
`;

const MainContentsSection = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  align-items: stretch;
`;

function CommonLayout() {
  return (
    <Background>

      <MainContentsSection>
    
        <MainContents>
          <QueryErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </QueryErrorBoundary>
        </MainContents>
      </MainContentsSection>

    </Background>
  );
}

export default CommonLayout;
