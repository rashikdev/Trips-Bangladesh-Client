import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyBooking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: myBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
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
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-4 md:px-12 py-16 min-h-screen text-white">
      {myBookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm  rounded-lg shadow-md">
            <thead className="bg-gray-700 text-white text-left">
              <tr>
                <th className="p-3">Package</th>
                <th className="p-3">Tour Guide</th>
                <th className="p-3">Tour Date</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((booking) => (
                <tr
                  key={booking?._id}
                  className="border-b hover:bg-teal-800 transition"
                >
                  <td className="p-3">{booking?.packageName}</td>
                  <td className="p-3">{booking?.tourGuide.name || "N/A"}</td>
                  <td className="p-3">
                    {new Date(booking?.tourDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">{booking?.price} BDT</td>
                  <td className="p-3 capitalize font-medium text-center">
                    {booking.status === "pending" && (
                      <span className="text-red-400 bg-gray-200/40 px-1 rounded">
                        {booking.status}
                      </span>
                    )}
                    {booking.status === "In Review" && (
                      <span className="text-yellow-200 bg-gray-200/40 px-1 rounded">
                        {booking.status}
                      </span>
                    )}
                    {booking.status === "Accepted" && (
                      <span className="text-green-400 bg-gray-200/40 px-1 rounded">
                        {booking.status}
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex gap-3 justify-center">
                    {booking?.status === "pending" && (
                      <>
                        <Link to={`/dashboard/payment/${booking?._id}`}>
                          <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer">
                            Pay
                          </button>
                        </Link>
                        <button
                          onClick={() => handleCancelConfirmation(booking?._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking?.status !== "pending" && (
                      <span className="text-gray-400">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyBooking;
