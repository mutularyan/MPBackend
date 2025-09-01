import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function NewCase() {
  const navigate = useNavigate();
  const { token } = useAuth(); // get token from context
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    description: "",
    last_seen_location: "",
  });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post(
        "/api/cases",
        { ...form, age: Number(form.age || 0) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/cases");
    } catch (e) {
      setError(e.response?.data?.msg || "Failed to create case");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 520 }}>
      <h2>Report a Case</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>Full name</label>
      <input
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        required
      />
      <label>Age</label>
      <input
        type="number"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
        required
      />
      <label>Description</label>
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        required
      />
      <label>Last seen location</label>
      <input
        value={form.last_seen_location}
        onChange={(e) => setForm({ ...form, last_seen_location: e.target.value })}
        required
      />
      <button type="submit" style={{ marginTop: 12 }}>
        Submit
      </button>
    </form>
  );
}
