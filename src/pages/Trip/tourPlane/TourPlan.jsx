import React from "react";

const TourPlan = () => {
  const plans = [
    {
      title: "Day 1: Arrival & Welcome",
      description:
        "Arrive at the destination and check in to your hotel. Enjoy a welcome dinner and get briefed about the upcoming tour.",
    },
    {
      title: "Day 2: Sightseeing & Activities",
      description:
        "Explore the city's iconic landmarks, indulge in local cuisine, and engage in cultural activities.",
    },
    {
      title: "Day 3: Adventure & Exploration",
      description:
        "Embark on a thrilling adventure, explore hidden gems, and witness breathtaking landscapes.",
    },
  ];

  return (
    <div>
      <div className="my-12">
        <h3 className="text-2xl font-bold mb-6">Tour Plan</h3>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Day plans */}
          {plans.map((plan, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-xl border dark:border-white/20 backdrop-blur-md md:w-[60vw] border-gray-300">
              <h4 className="text-xl font-semibold text-orange-400 mb-2">
                Day 1: Arrival & Welcome
              </h4>
              <p className="dark:text-white/80 text-black/80">
                Arrive at the destination and check in to your hotel. Enjoy a
                welcome dinner and get briefed about the upcoming tour.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourPlan;
