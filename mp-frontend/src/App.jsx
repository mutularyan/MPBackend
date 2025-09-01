import { Routes, Route, Link, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CasesList from "./pages/CasesList";
import NewCase from "./pages/NewCase";
import EditCase from "./pages/EditCase";
import Profile from "./pages/Profile";



function Layout() {
  const { isAuthenticated, email, logout } = useAuth();
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <nav style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/cases">Cases</Link>
        {isAuthenticated && <Link to="/cases/new">Report Case</Link>}
        <div style={{ marginLeft: "auto" }}>
          {isAuthenticated ? (
            <>
              <Link to="/profile" style={{ marginRight: 12 }}>{email}</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

function Home() {
  return <p>Welcome to the Missing Persons app.</p>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route
          path="cases"
          element={
            <ProtectedRoute>
              <CasesList />
            </ProtectedRoute>
          }
        />
        <Route
          path="cases/new"
          element={
            <ProtectedRoute>
              <NewCase />
            </ProtectedRoute>
          }
        />
        <Route
          path="cases/:id/edit"
          element={
            <ProtectedRoute>
              <EditCase />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

