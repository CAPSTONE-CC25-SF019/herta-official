import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/authentication/login";
import RegisterPage from "./pages/authentication/register";
import LandingPage from "./pages/landing";

function App() {
  // TODO: Implement Layout
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
