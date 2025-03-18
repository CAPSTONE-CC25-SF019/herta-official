import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/authentication/login";
import RegisterPage from "./pages/authentication/register";
import LandingPage from "./pages/landing";
import DiseasePage from "./pages/disease";

function App() {
  // TODO: Implement Layout
  // TODO: Align each route
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/disease" element={<DiseasePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
