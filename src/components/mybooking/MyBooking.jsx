import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../loadingPage/LoadingSpinner";
import BookingCelebration from "../celebration/BookingCelebration";
import { useState } from "react";
import Pagination from "../Shared/Pagination";

const MyBooking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBookings, setTotalBookings] = useState(0);
  const limit = 10;

  const totalPages = Math.ceil(totalBookings / limit);

  const {
    data: myBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${user?.email}&page=${currentPage}&limit=${limit}`
      );
      setTotalBookings(res.data.total);
      return res.data.bookings;
    },
  });

  const handleCancel = async (id) => {
    try {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.data.deletedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelConfirmation = (packageId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel this booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "No, keep it!",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel(packageId);
        Swal.fire({
          icon: "success",
          title: "Booking Cancelled!",
          confirmButtonColor: "#d33",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
        });
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <section className="px-4 md:px-12 py-16 min-h-screen">
      {myBookings.length === 0 ? (
        <div className="bg-white/10 p-8 rounded-xl text-center shadow-xl border border-white/20 max-w-md flex flex-col items-center mx-auto mt-16 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-3 text-primary">
            No Bookings Found
          </h2>
          <p className="dark:text-white/70">
            You haven&apos;t made any bookings yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-white/20 backdrop-blur-md bg-white/5">
          <table className="w-full text-sm">
            <thead className="bg-white/10 uppercase text-xs dark:text-white/80">
              <tr>
                <th className="p-4 text-left">Package</th>
                <th className="p-4 text-left">Tour Guide</th>
                <th className="p-4 text-left">Tour Date</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((booking) => (
                <tr
                  key={booking?._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">{booking?.packageName}</td>
                  <td className="p-4">{booking?.tourGuide?.name || "N/A"}</td>
                  <td className="p-4">
                    {new Date(booking?.tourDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">{booking?.price} BDT</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-sm font-semibold ${
                        booking.status === "pending" ||
                        booking.status === "rejected"
                          ? "bg-red-400/10 text-red-400"
                          : booking.status === "In Review"
                          ? "dark:bg-yellow-300/10 bg-yellow-400/10 dark:text-yellow-200 text-yellow-400"
                          : "bg-green-400/10 text-green-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {booking?.status === "pending" ? (
                      <div className="flex justify-center gap-3">
                        <Link to={`/dashboard/payment/${booking?._id}`}>
                          <button className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded transition text-sm">
                            Pay
                          </button>
                        </Link>
                        <button
                          onClick={() => handleCancelConfirmation(booking?._id)}
                          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded transition text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm italic">
                        No action
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={setCurrentPage}
      ></Pagination>
      <BookingCelebration
        bookings={myBookings}
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={setCurrentPage}
      ></BookingCelebration>
    </section>
  );
};

export default MyBooking;
