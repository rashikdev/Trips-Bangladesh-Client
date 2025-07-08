import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const MyBooking = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user?.email) {
  //     axios
  //       .get(`http://localhost:5000/bookings?email=${user.email}`)
  //       .then((res) => setBookings(res.data))
  //       .catch((err) => console.error("Error loading bookings:", err));
  //   }
  // }, [user]);

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

  const demoData = [
    {
      _id: "1",
      packageName: "Sundarbans Adventure",
      tourGuideName: "Rahim Uddin",
      tourDate: "2025-08-15",
      price: 250,
      status: "pending",
      email: "tourist1@example.com",
    },
    {
      _id: "2",
      packageName: "Cox's Bazar Beach Trip",
      tourGuideName: "Nasrin Sultana",
      tourDate: "2025-09-01",
      price: 180,
      status: "in review",
      email: "tourist1@example.com",
    },
    {
      _id: "3",
      packageName: "Sylhet Tea Garden Escape",
      tourGuideName: "Kawsar Hossain",
      tourDate: "2025-08-25",
      price: 220,
      status: "accepted",
      email: "tourist2@example.com",
    },
    {
      _id: "4",
      packageName: "Bandarban Hill Trek",
      tourGuideName: "Shamim Arafat",
      tourDate: "2025-08-30",
      price: 300,
      status: "rejected",
      email: "tourist3@example.com",
    },
    {
      _id: "5",
      packageName: "Rangamati Lake & Culture",
      tourGuideName: "Sumaiya Akter",
      tourDate: "2025-09-10",
      price: 210,
      status: "pending",
      email: "tourist1@example.com",
    },
  ];

  return (
    <section className="px-4 md:px-12 py-16 min-h-screen text-white">
      <h2 className="text-3xl font-bold text-center mb-10">My Bookings</h2>

      {demoData.length === 0 ? (
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
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoData.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b hover:bg-teal-800 transition"
                >
                  <td className="p-3">{booking.packageName}</td>
                  <td className="p-3">{booking.tourGuideName || "N/A"}</td>
                  <td className="p-3">{booking.tourDate}</td>
                  <td className="p-3">${booking.price}</td>
                  <td className="p-3 capitalize font-medium">
                    {booking.status}
                  </td>
                  <td className="p-3 flex gap-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() => handlePayment(booking)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Pay
                        </button>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status !== "pending" && (
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
