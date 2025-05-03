import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Links } from "./pages/Links";
import { Redirect } from "./pages/Redirect";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Links />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}