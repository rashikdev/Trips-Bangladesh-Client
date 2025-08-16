import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import PackageCard from "../Shared/PackageCard";

const PopularDestinations = () => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-500 text-lg font-semibold bg-red-100 px-4 py-2 rounded-md shadow-sm">
          Failed to load destinations. Please try again.
        </p>
      </div>
    );
  }

  const popularDestinations = packages.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-primary">
          Popular Destinations
        </h2>
        <p className="text-gray-400 mb-10">
          Explore the most loved travel spots and make unforgettable memories
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-10 md:px-0">
          {popularDestinations.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg}></PackageCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
