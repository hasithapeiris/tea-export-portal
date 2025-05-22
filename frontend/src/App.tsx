import "./App.css";
import { DashboardLayout } from "./components";
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
  Dashboard,
  Profile,
  ChatAgent,
} from "./pages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatWindow from "./pages/ChatWindow";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedRoute = ({
  children,
  adminOnly = false,
}: {
  children: JSX.Element;
  adminOnly?: boolean;
}) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || (adminOnly && !user.isAdmin)) return <Navigate to="/login" />;
  return children;
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
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/chat" element={<ChatAgent />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>
          <Route path="/chat" element={<ChatWindow />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
