import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorIcon from "@/assets/Error.svg?react";

export default function QueryErrorBoundary({
  children,
}: {
  children: ReactNode;
}) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "#f8f8f8",
            textAlign: "center",
          }}
        >
          <ErrorIcon
            style={{ width: "70px", height: "auto", marginBottom: "20px" }}
          />

          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            오류 발생!
          </h2>
          <button
            onClick={resetErrorBoundary}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            ↻ 다시 시도
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
