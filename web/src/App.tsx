import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Links } from "./pages/Links";
import { Redirect } from "./pages/Redirect";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Links />} />
        <Route path="*" element={<Redirect />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}