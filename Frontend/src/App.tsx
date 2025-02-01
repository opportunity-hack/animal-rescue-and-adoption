import Home from "./pages/homepage";
import ScrollToHashElement from "./components/ScrollToHashElement";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboardPage from "./pages/admin-dashboard";
import Admin from "./pages/admin";

function App() {
  return (
    <Router>
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin" element={<Admin />} />    
      </Routes>
      <ScrollToHashElement />
    </Router>
  );
}

export default App;
