import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Examples from "./Examples";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/examples" element={<Examples />} />
      </Routes>
    </BrowserRouter>
  );
}
