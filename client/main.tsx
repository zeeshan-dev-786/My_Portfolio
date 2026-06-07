import "./global.css";

import { createRoot } from "react-dom/client";
import AppContent from "./App";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

const root = createRoot(container);
root.render(<AppContent />);

// HMR
if (import.meta.hot) {
  import.meta.hot.accept("./App", (module) => {
    root.render(<module.default />);
  });
}
