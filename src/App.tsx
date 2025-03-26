import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/authentication/login";
import RegisterPage from "./pages/authentication/register";
import LandingPage from "./pages/landing";
import DiseasePage from "./pages/disease";
import HistoryPage from "./pages/history";
import ProfilePage from "./pages/authentication/profile";

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
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
