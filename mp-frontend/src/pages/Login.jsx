import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/cases"); // redirect after login
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420 }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>Email</label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" style={{ marginTop: 12 }}>Login</button>
      <p style={{ marginTop: 12 }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>
  );
}
