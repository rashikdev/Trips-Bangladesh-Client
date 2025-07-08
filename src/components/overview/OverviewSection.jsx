import React from "react";

const OverviewSection = () => {
  return (
    <section className="relative py-20 px-6 md:px-10 bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] text-white overflow-hidden">
      {/* Decorative Background Shape */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl opacity-30"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto backdrop-blur-md bg-white/5 p-10 rounded-xl border border-white/10 shadow-xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Your Guide to Explore Bangladesh
        </h2>
        <div className="h-1 w-24 mx-auto bg-teal-400 rounded-full mb-6"></div>
        <p className="text-lg md:text-xl text-white/80 leading-relaxed space-y-4">
          <span className="block mb-4">
            <strong className="text-teal-300">Travel BD</strong> is your
            ultimate companion for discovering the breathtaking beauty of
            Bangladesh. Whether it's your first trip or your next great
            adventure, we’ve got everything you need.
          </span>
          <span className="block">
            Explore iconic landmarks, hidden gems, local food, cultural
            traditions, and thrilling activities—all in one place. Plan smarter,
            travel deeper, and make every moment count.
          </span>
        </p>
      </div>
    </section>
  );
};

export default OverviewSection;
