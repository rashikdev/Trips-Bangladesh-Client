import React, { useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../loadingPage/LoadingSpinner";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // react-icons

const AllTrips = () => {
  const axiosSecure = useAxiosSecure();
  const [sortOrder, setSortOrder] = useState("asc");

  const {
    data: packages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  // Sorting logic
  const sortedPackages = [...packages].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <section className="min-h-screen py-16 px-6 md:px-12 bg-gradient-to-b from-[#0d1b2a] to-[#1b263b] text-white pt-30">
      <div className="md:max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Explore All Trips
        </h2>

        {/* Sorting Controls */}
        <div className="flex justify-end mb-6 md:mb-10">
          <div className="flex flex-col md:flex-row items-center gap-3 md:rounded-full rounded-xl bg-white/10 backdrop-blur-md p-3 shadow-lg border border-white/20 w-full md:w-auto overflow-x-auto">
            <p className="text-white text-left font-medium mr-0 md:mr-2 mb-2 md:mb-0 whitespace-nowrap">
              Sort by Price:
            </p>

            <div className="flex gap-2 md:gap-3 flex-wrap md:flex-nowrap">
              {/* Ascending */}
              <button
                onClick={() => setSortOrder("asc")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  sortOrder === "asc"
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                }`}
                title="Low to High"
              >
                <FaArrowUp
                  className={sortOrder === "asc" ? "animate-bounce" : ""}
                />
                Low → High
              </button>

              {/* Descending */}
              <button
                onClick={() => setSortOrder("desc")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  sortOrder === "desc"
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-800 hover:bg-gray-200"
                }`}
                title="High to Low"
              >
                <FaArrowDown
                  className={sortOrder === "desc" ? "animate-bounce" : ""}
                />
                High → Low
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {sortedPackages.map((pkg) => (
            <Link key={pkg._id} to={`/package/${pkg._id}`}>
              <div
                className="rounded-xl overflow-hidden shadow-md group bg-white text-gray-800 w-full mx-auto h-[300px] md:h-[500px] hover:scale-105 transition-transform duration-300 relative"
                style={{
                  backgroundImage: `url(${pkg.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Text Content */}
                <div className="p-5 flex flex-col h-full justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold backdrop-blur-xl leading-tight w-fit">
                      {pkg.title}
                    </h3>
                    <p className="text-2xl font-bold text-orange-400 backdrop-blur-lg w-fit px-2">
                      {pkg.price} BDT
                    </p>
                    <p className="text-2xl font-bold bg-white/10 text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {pkg.tourType}
                    </p>
                  </div>

                  <button className="inline-block bg-primary hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-full text-sm transition text-center group">
                    Explore{" "}
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {packages.length === 0 && (
          <p className="text-center mt-12 text-white/60">No packages found.</p>
        )}
      </div>
    </section>
  );
};

export default AllTrips;
