import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainLayout from "./components/MainLayout";
import {
  Home,
  ForexPrediction,
  Portal,
  ForexPortal,
  ForexForecast,
  NationalProdForecast,
  RegionalProdForecast,
  Profile,
} from "./pages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import ChatWindow from "./pages/ChatWindow";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedRoute = ({ adminOnly = false }: { adminOnly?: boolean }) => {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (!user || (adminOnly && !user.isAdmin)) return <Navigate to="/login" />;

  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
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

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<ChatWindow />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
