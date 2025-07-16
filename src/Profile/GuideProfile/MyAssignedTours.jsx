import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/loadingPage/LoadingSpinner";
import { set } from "react-hook-form";
import Pagination from "../../components/Shared/Pagination";

const MyAssignedTours = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const limit = 10;

  const {
    data: assignedTours = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["assignedTours", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assigned-tours?email=${user?.email}&page=${currentPage}&limit=${limit}`
      );
      setTotalApplications(res.data.total);
      return res.data.assignedTours;
    },
  });

  const totalPages = Math.ceil(totalApplications / limit);

  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(`/bookings/${id}`, {
        status: "accepted",
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Tour accepted",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to accept tour",
        timer: 2000,
        toast: true,
        showConfirmButton: false,
      });
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
        const res = await axiosSecure.patch(`/bookings/${id}`, {
          status: "rejected",
        });
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Tour rejected",
            timer: 2000,
            toast: true,
            showConfirmButton: false,
          });
          refetch();
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Failed to reject tour",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
        });
      }
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="min-h-screen py-10 px-6 text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center text-primary">
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
                <td className="px-4 py-2">
                  {new Date(tour.tourDate).toDateString()}
                </td>
                <td className="px-4 py-2">${tour.price}</td>
                <td
                  className={`px-4 py-2 capitalize ${
                    tour.status === "In Review" && "text-yellow-500"
                  } ${tour.status === "accepted" && "text-green-500"} ${
                    (tour.status === "pending" || tour.status === "rejected") &&
                    "text-red-500"
                  }`}
                >
                  {tour.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  {tour.status === "In Review" && (
                    <button
                      onClick={() => handleAccept(tour._id)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Accept
                    </button>
                  )}
                  {tour.status === "pending" && (
                    <button
                      disabled={true}
                      className="px-3 py-1 bg-gray-500 cursor-not-allowed text-white rounded"
                    >
                      Accept
                    </button>
                  )}
                  {tour.status === "In Review" && (
                    <button
                      onClick={() => handleReject(tour._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  )}
                  {(tour.status === "accepted" ||
                    tour.status === "rejected") && (
                    <span className="text-gray-300 text-center">
                      No Actions
                    </span>
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
      {/* pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
      ></Pagination>
    </section>
  );
};

export default MyAssignedTours;
