import { useState, useEffect } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Retrieve the JWT token stored during sign-in
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No token found. Please sign in.");
        }
        // Make a GET request to your secure endpoint
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch user data: ${res.statusText}`);
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, []);

  return { user, loading, error };
}
