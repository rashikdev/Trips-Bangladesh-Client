import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyBooking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  const handlePayment = (booking) => {
    navigate(`/payment/${booking._id}`, { state: booking });
  };

  const { data: myBookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
  });


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
                  <td className="p-3">${booking?.price}</td>
                  <td className="p-3 capitalize font-medium text-center">
                    {booking.status === "pending" && (
                      <span className="text-yellow-400 bg-gray-200/40 px-1 rounded">
                        Pending
                      </span>
                    )}
                    {booking.status === "confirmed" && (
                      <span className="text-green-400 bg-gray-200/40 px-1 rounded">
                        Confirmed
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex gap-3 justify-center">
                    {booking?.status === "pending" && (
                      <>
                        <button
                          onClick={() => handlePayment(booking)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Pay
                        </button>
                        <button
                          onClick={() => handleCancel(booking?._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
