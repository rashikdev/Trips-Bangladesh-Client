import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../loadingPage/LoadingSpinner";

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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <div>Something went wrong</div>;

  return (
    <section className="min-h-screen py-16 px-6 md:px-12 bg-gradient-to-b from-[#0d1b2a] to-[#1b263b] text-white pt-30">
      <div className="md:max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Explore All Trips
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
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
