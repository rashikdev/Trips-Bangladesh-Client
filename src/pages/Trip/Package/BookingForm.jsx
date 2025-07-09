import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BookingForm = ({ singlepackage, guides }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tourDate, setTourDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState("");
  const axiosSecure = useAxiosSecure();

  const { price, title } = singlepackage;
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to book a tour");
      return navigate("/login");
    }

    if (!tourDate || !selectedGuide) {
      return toast.error("Please select tour date and guide");
    }

    const bookingInfo = {
      packageName: title,
      touristName: user?.displayName,
      touristEmail: user?.email,
      touristImage: user?.photoURL,
      price,
      tourDate: tourDate.toISOString(),
      bookingDate: new Date().toISOString(),
      tourGuide: JSON.parse(selectedGuide),
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingInfo);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Tour booked successfully!",
          html: `
          <p>Your booking has been placed successfully.</p>
          <a href="/dashboard/myBookings" class="text-blue-600 underline font-medium mt-2 inline-block">Go to My Bookings</a>
        `,
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Failed to book tour");
    }
    setTourDate(null);
    e.target.reset();
  };

  return (
    <section className=" mx-auto bg-white/10 border border-white/20 p-8 rounded-xl backdrop-blur-md shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-6 text-primary">Book Your Trip</h2>
      <form
        onSubmit={handleBooking}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Package Name */}
        <div>
          <label className="block mb-1 font-medium">Package Name</label>
          <input
            type="text"
            value={title}
            readOnly
            className="w-full p-2 rounded bg-white/10 border border-white/30 text-white"
          />
        </div>

        {/* Tourist Name */}
        <div>
          <label className="block mb-1 font-medium">Tourist Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full p-2 rounded bg-white/10 border border-white/30 text-white"
          />
        </div>

        {/* Tourist Email */}
        <div>
          <label className="block mb-1 font-medium">Tourist Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full p-2 rounded bg-white/10 border border-white/30 text-white"
          />
        </div>

        {/* Tourist Image */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            value={user?.photoURL || ""}
            readOnly
            className="w-full p-2 rounded bg-white/10 border border-white/30 text-white"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="text"
            value={`$${price}`}
            readOnly
            className="w-full p-2 rounded bg-white/10 border border-white/30 text-white"
          />
        </div>

        {/* Tour Date */}
        <div>
          <label className="block mb-1 font-medium">Tour Date</label>
          <DatePicker
            selected={tourDate}
            onChange={(date) => setTourDate(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 rounded bg-white/10 border border-white/30 text-white"
            placeholderText="Select tour date"
            wrapperClassName="w-full"
          />
        </div>

        {/* Tour Guide Dropdown */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Tour Guide</label>
          <select
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            className="w-full p-2 rounded bg-white/10 border border-white/30"
          >
            <option value="">Select a guide</option>
            {guides.map((guide, i) => (
              <option
                className=" text-black"
                key={i}
                value={JSON.stringify({ name: guide.name, email: guide.email })}
              >
                {guide.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </form>
    </section>
  );
};

export default BookingForm;
