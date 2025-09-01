import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/client";

export default function EditCase() {
  const { state } = useLocation(); // we pass the case from the list
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    description: "",
    last_seen_location: "",
  });
  const [error, setError] = useState("");

  // If navigated directly, you could fetch all and find by id (or add a GET /cases/:id in backend)
  useEffect(() => {
    if (state?.caseData) {
      const c = state.caseData;
      setForm({
        full_name: c.full_name || "",
        age: c.age || "",
        description: c.description || "",
        last_seen_location: c.last_seen_location || "",
      });
    }
  }, [state]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.put(`/cases/${id}`, {
        ...form,
        age: Number(form.age || 0),
      });
      navigate("/cases");
    } catch (e) {
      setError(e.response?.data?.msg || "Update failed (you might not be the owner).");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 520 }}>
      <h2>Edit Case #{id}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>Full name</label>
      <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required />
      <label>Age</label>
      <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
      <label>Description</label>
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
      <label>Last seen location</label>
      <input value={form.last_seen_location} onChange={(e) => setForm({ ...form, last_seen_location: e.target.value })} required />
      <button type="submit" style={{ marginTop: 12 }}>Save</button>
    </form>
  );
}
