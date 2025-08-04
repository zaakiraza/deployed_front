// src/web/App.jsx
import React from "react";
import WebRoutes from "./WebRoutes";
import { WebProvider } from "./context/WebContext";

function WebApp() {
  return (
    <WebProvider>
      <WebRoutes />
    </WebProvider>
  );
}

export default WebApp;
