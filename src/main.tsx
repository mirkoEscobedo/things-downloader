import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./state/store.ts";
import StorageListener from "./components/storage_listener/StorageListener.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <StorageListener />
      <App />
    </Provider>
  </StrictMode>
);
