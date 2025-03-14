import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/landing";
import LoginPage from "./pages/authentication/login";
import RegisterPage from "./pages/authentication/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
