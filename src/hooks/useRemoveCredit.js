import { useState } from "react";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const useRemoveCredits = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(null);

  const removeCredits = async (amount) => {
    if (!amount || amount <= 0) {
      setError("Invalid credit amount");
      return;
    }

    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/api/v1/user/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to remove credits");
      }

      setCredits(data.credits);
      return data;
    } catch (err) {
      console.error("Remove credits error:", err);
      setError(err.message || "An error occurred while removing credits");
    } finally {
      setLoading(false);
    }
  };

  return { removeCredits, loading, error, credits };
};

export default useRemoveCredits;
