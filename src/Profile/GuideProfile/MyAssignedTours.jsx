import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAssignedTours = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: assignedTours = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assignedTours", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-tours?email=${user?.email}`);
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(`/bookings/${id}/accept`);
      if (res.data.modifiedCount > 0) {
        toast.success("Tour accepted successfully");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to accept tour");
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this tour?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Reject it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/bookings/${id}/reject`);
        if (res.data.modifiedCount > 0) {
          toast.success("Tour rejected");
          refetch();
        }
      } catch (err) {
        toast.error("Failed to reject tour");
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <section className="min-h-screen py-10 px-6 bg-slate-900 text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        My Assigned Tours
      </h2>
      <div className="overflow-x-auto bg-white/10 p-6 rounded-lg border border-white/20">
        <table className="w-full table-auto text-sm">
          <thead className="bg-white/20 text-left">
            <tr>
              <th className="px-4 py-2">Package Name</th>
              <th className="px-4 py-2">Tourist Name</th>
              <th className="px-4 py-2">Tour Date</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedTours.map((tour) => (
              <tr key={tour._id} className="border-t border-white/10">
                <td className="px-4 py-2">{tour.packageName}</td>
                <td className="px-4 py-2">{tour.touristName}</td>
                <td className="px-4 py-2">{tour.tourDate}</td>
                <td className="px-4 py-2">${tour.price}</td>
                <td className="px-4 py-2 capitalize">{tour.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleAccept(tour._id)}
                    disabled={tour.status !== "in-review"}
                    className={`px-3 py-1 rounded ${
                      tour.status === "in-review"
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Accept
                  </button>
                  {tour.status === "in-review" && (
                    <button
                      onClick={() => handleReject(tour._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {assignedTours.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-300">
                  No assigned tours yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyAssignedTours;
