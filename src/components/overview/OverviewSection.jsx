import React from "react";

const OverviewSection = () => {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center backdrop-blur-md bg-white/5 px-10 py-20 rounded-xl border border-white/10 shadow-xl">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Guide to Explore Bangladesh
          </h2>
          <div className="h-1 w-24 bg-primary rounded-full mb-6 mx-auto md:mx-0"></div>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            <span className="block mb-4">
              <strong className="text-primary">Trips</strong> is your
              ultimate companion for discovering the breathtaking beauty of
              Bangladesh. Whether it's your first trip or your next great
              adventure, we’ve got everything you need.
            </span>
            <span className="block">
              Explore iconic landmarks, hidden gems, local food, cultural
              traditions, and thrilling activities—all in one place. Plan
              smarter, travel deeper, and make every moment count.
            </span>
          </p>
        </div>

        {/* Video Content */}
        <div className="aspect-w-16 aspect-h-9 h-full w-full rounded-lg overflow-hidden shadow-lg border border-white/10">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/fN21oOdni_c?si=EwRJuWLN_SQhSAOI"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
