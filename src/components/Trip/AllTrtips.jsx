import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllTrips = () => {
  const axiosSecure = useAxiosSecure();

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

  if (isLoading)
    return <div className="text-center text-white h-screen">Loading...</div>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <section className="min-h-screen py-16 px-6 md:px-12 bg-gradient-to-b from-[#0d1b2a] to-[#1b263b] text-white pt-30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Explore All Trips
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="rounded-xl overflow-hidden shadow-md group bg-white text-gray-800 w-full max-w-xs mx-auto h-[300px] md:h-[500px] hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: `url(${pkg.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Text Content */}
              <div className="p-5 flex flex-col h-full justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">
                    {pkg.title}
                  </h3>
                  <p className="text-sm text-gray-300">Starting from</p>
                  <p className="text-2xl font-bold text-gray-200">
                    ${pkg.price}
                  </p>
                </div>

                <Link
                  to={`/package/${pkg._id}`}
                  className="inline-block bg-primary hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-full text-sm transition text-center group"
                >
                  Explore{" "}
                  <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </div>
            </div>
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
