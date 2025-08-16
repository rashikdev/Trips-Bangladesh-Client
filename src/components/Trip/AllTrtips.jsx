import React, { useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../loadingPage/LoadingSpinner";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // react-icons
import PackageCard from "../Shared/PackageCard";

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
    <section className="min-h-screen py-16 px-6 md:px-12 pt-30">
      <div className="md:max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Explore All Trips
        </h2>

        {/* Sorting Controls */}
        <div className="flex justify-end mb-6 md:mb-10">
          <div className="flex flex-col md:flex-row items-center gap-3 md:rounded-full rounded-xl dark:bg-white/10 p-3 shadow-lg border dark:border-white/20 border-zinc-300 w-full md:w-auto overflow-x-auto">
            <p className="text-left font-medium mr-0 md:mr-2 mb-2 md:mb-0 whitespace-nowrap">
              Sort by Price:
            </p>

            <div className="flex gap-2 md:gap-3 flex-wrap md:flex-nowrap">
              {/* Ascending */}
              <button
                onClick={() => setSortOrder("asc")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm sm:text-base transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  sortOrder === "asc"
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105"
                    : "text-gray-800 bg-gray-200"
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
                    : "text-gray-800 bg-gray-200"
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
            <PackageCard key={pkg._id} pkg={pkg}></PackageCard>
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
