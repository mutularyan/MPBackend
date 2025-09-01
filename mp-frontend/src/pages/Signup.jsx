import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMsg("");
    try {
      await signup(form.email, form.password);
      setMsg("Signup successful. You can login now.");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 420 }}>
      <h2>Sign up</h2>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
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
      <button type="submit" style={{ marginTop: 12 }}>Create account</button>
      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
