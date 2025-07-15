import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const BookingCelebration = ({ bookings = [] }) => {
  const { width, height } = useWindowSize();
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const trigger = sessionStorage.getItem("trigger-congrats");

    if (trigger === "yes" && bookings.length > 3) {
      setShowCongrats(true);

      const timeout = setTimeout(() => {
        sessionStorage.setItem("trigger-congrats", "no");
        setShowCongrats(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [bookings]);

  return (
    <div className="relative">
      {showCongrats && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <Confetti width={width} height={height} numberOfPieces={300} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:left-40 top-20">
            <div className="bg-white/20 px-8 py-6 rounded-xl shadow-2xl text-center backdrop-blur-md border border-primary w-[90%] md:w-fit">
              <h2 className="md:text-3xl text-xl font-bold text-primary mb-2">
                🎉 Congratulations!
              </h2>
              <p className="text-lg text-white">
                You've booked more than 3 tours! Thanks for being an awesome
                explorer.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCelebration;
