import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeData } from "./services/storage";

// Initialize database asynchronously
initializeData().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
