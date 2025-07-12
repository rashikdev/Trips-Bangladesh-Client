import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!email) return;

    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get(`/users/role?email=${email}`);
        setRole(res.data?.role || "tourist");
      } catch (err) {
        setError(err);
        setRole("tourist");
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [email, axiosSecure]);

  return { role, loading, error };
};

export default useRole;
