import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import WebApp from "./web/App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

const root = createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Router>
      <Routes>
        {/* <Route path="/admin/*" element={<AdminApp />} /> */}
        <Route path="/*" element={<WebApp />} />
      </Routes>
    </Router>
  </ChakraProvider>
);
