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
    return <p className="text-center text-gray-500">Loading destinations...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Failed to load destinations. Try again.
      </p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {popularDestinations.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg}></PackageCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
