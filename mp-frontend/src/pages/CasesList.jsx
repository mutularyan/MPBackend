import { useState, useEffect } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";

export default function CasesList() {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await api.get("/api/cases"); // JWT automatically added
        setCases(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Failed to fetch cases");
      }
    };

    fetchCases();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!cases.length) return <p>No cases reported yet.</p>;

  return (
    <div style={{ maxWidth: 800 }}>
      <h2>All Missing Cases</h2>
      <ul>
        {cases.map((c) => (
          <li key={c.id} style={{ marginBottom: 16, borderBottom: "1px solid #ccc", paddingBottom: 8 }}>
            <p><strong>Name:</strong> {c.full_name}</p>
            <p><strong>Age:</strong> {c.age}</p>
            <p><strong>Description:</strong> {c.description}</p>
            <p><strong>Last Seen:</strong> {c.last_seen_location}</p>
            <p><strong>Reported On:</strong> {new Date(c.date_reported).toLocaleString()}</p>
            <Link to={`/cases/${c.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
