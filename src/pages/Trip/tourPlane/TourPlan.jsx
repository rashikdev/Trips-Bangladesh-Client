import React from "react";

const TourPlan = () => {
  return (
    <div>
      <div className="my-12">
        <h3 className="text-2xl font-bold text-white mb-6">Tour Plan</h3>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Day 1 */}
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-md md:w-[60vw]">
            <h4 className="text-xl font-semibold text-orange-400 mb-2">
              Day 1: Arrival & Welcome
            </h4>
            <p className="text-white/80">
              Arrive at the destination and check in to your hotel. Enjoy a
              welcome dinner and get briefed about the upcoming tour.
            </p>
          </div>

          {/* Day 2 */}
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-md md:w-[60vw]">
            <h4 className="text-xl font-semibold text-orange-400 mb-2">
              Day 2: Sightseeing & Activities
            </h4>
            <p className="text-white/80">
              Explore the top attractions including historical sites, natural
              wonders, and local markets. Enjoy a cultural performance in the
              evening.
            </p>
          </div>

          {/* Day 3 */}
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-md md:w-[60vw]">
            <h4 className="text-xl font-semibold text-orange-400 mb-2">
              Day 3: Departure
            </h4>
            <p className="text-white/80">
              After breakfast, enjoy some leisure time or shopping before
              heading to the airport for your departure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPlan;
