import "./App.css";
import { DashboardLayout } from "./components";
import MainLayout from "./components/MainLayout";
import {
  Home,
  ForexPrediction,
  Portal,
  ForexPortal,
  ForexForecast,
  NationalProdForecast,
  RegionalProdForecast,
  Dashboard,
  Profile,
  ChatAgent,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatWindow from "./pages/ChatWindow";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/forex" element={<ForexPortal />} />
          <Route path="/portal/forex/fee" element={<ForexPrediction />} />
          <Route
            path="/portal/forex/fee-forecast"
            element={<ForexForecast />}
          />
          <Route
            path="/portal/forex/national-production-forecast"
            element={<NationalProdForecast />}
          />
          <Route
            path="/portal/forex/regional-production-forecast"
            element={<RegionalProdForecast />}
          />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/chat" element={<ChatAgent />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>
        <Route path="/chat" element={<ChatWindow />} />
      </Routes>
    </Router>
  );
};

export default App;
