import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ConfirmEmailPage() {
  const location = useLocation();

  // Extract token from query string
  const params = new URLSearchParams(location.search);
  const token = params.get("token"); // this is your token

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch(`http://localhost:8000/auth/confirm?token=${token}`, {
        method: "GET"
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "Erreur de confirmation");
      }

      alert("Email confirmé ✅");
      // optionally redirect to login or next step
    } catch (err: any) {
      alert(err.message);
    }
  };

  return <div>Vérification de votre email...</div>;
}
