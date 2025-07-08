import { useEffect, useState } from "react";
import axios from "axios";

const useRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!email) return;

    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `localhost:5000/users/role?email=${email}`
        );
        setRole(res.data?.role || "tourist");
      } catch (err) {
        setError(err);
        setRole("tourist"); 
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [email]);

  return { role, loading, error };
};

export default useRole;
