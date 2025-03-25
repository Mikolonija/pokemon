import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import App from "@/pages/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
