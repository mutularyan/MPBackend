import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { email, token } = useAuth();
  return (
    <div>
      <h2>My Profile</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Token present:</strong> {token ? "Yes" : "No"}</p>
    </div>
  );
}
