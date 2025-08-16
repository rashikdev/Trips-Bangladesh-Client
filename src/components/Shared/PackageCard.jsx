import React from "react";
import { Link } from "react-router";

const PackageCard = ({ pkg }) => {
  return (
    <div>
      <Link to={`/package/${pkg._id}`}>
        <div className="relative rounded-2xl overflow-hidden shadow-lg group h-[320px] md:h-[420px]">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${pkg.thumbnail})` }}
          ></div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-end h-full p-5 text-left text-white">
            <span
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold px-4 rounded-2xl w-fit mb-3 bg-clip-text text-transparent backdrop-blur-[3px]"
              style={{
                backgroundImage: `url(${pkg.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {pkg.tourType}
            </span>
            <h3 className="text-lg font-bold leading-snug">{pkg.title}</h3>
            <p className="text-orange-400 font-semibold text-lg">
              {pkg.price} BDT
            </p>

            <button className="mt-4 flex justify-center items-center gap-2 bg-primary hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-full text-sm transition">
              Explore
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PackageCard;
