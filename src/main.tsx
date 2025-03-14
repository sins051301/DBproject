import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  async function enableMocking() {
    if (import.meta.env.VITE_NODE_ENV !== "development") {
      return;
    }

    const { worker } = await import("./mocks/browsers");
    return worker.start();
  }

  enableMocking().then(() => {
    root.render(<App />);
  });
}
