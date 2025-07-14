import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import GuideCard from "./GuideCard";

const TourismGuide = () => {
  // your data fetching here...
  const axiosSecure = useAxiosSecure();

  // random packages
  const {
    data: randomPackages = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["randomPackages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/random-packages");
      return res.data;
    },
  });

  // random guides
  const {
    data: randomGuides = [],
    isLoading: guidesLoading,
    isError: guidesError,
  } = useQuery({
    queryKey: ["randomGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/random-guides");
      return res.data;
    },
  });

  return (
    <section className="max-w-7xl mx-auto py-10 text-white min-h-[64vh]">
      <Tabs className="">
        <TabList className="flex border-b border-orange-600 mb-10">
          <Tab
            className="flex items-center gap-2 px-6 py-3 cursor-pointer"
            selectedClassName="text-orange-700  font-semibold outline-none"
          >
            Our Packages
          </Tab>

          <Tab
            className="flex items-center gap-2 px-6 py-3 cursor-pointer "
            selectedClassName="text-orange-700  font-semibold outline-none"
          >
            Meet Our Tour Guides
          </Tab>
        </TabList>

        <TabPanel>
          {/* Content for Level 1 Course */}
          <div className="grid md:grid-cols-3 gap-6">
            {randomPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="rounded-xl shadow-lg overflow-hidden border border-gray-600 h-[400px] hover:scale-105 transition duration-300 ease-in-out"
                style={{
                  backgroundImage: `url(${pkg.thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="p-5 flex flex-col justify-between h-full">
                  <div className="space-y-4 text-white">
                    <h3 className="w-fit px-2 font-semibold">
                      {pkg.title}
                    </h3>
                    <p className="text-xl px-3 font-bold w-fit">
                      {pkg.price} BDT
                    </p>
                  </div>
                  <div>
                    <h3 className="text-5xl text-center text-white/40">
                      {pkg.tourType}
                    </h3>
                  </div>
                  <Link
                    to={`/package/${pkg._id}`}
                    className="inline-block bg-primary hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-full text-sm transition text-center group"
                  >
                    View Package{" "}
                    <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          {/* Content for Conceptual Session */}
          <div className="grid md:grid-cols-3 gap-6">
            {randomGuides.map((guide) => (
              <GuideCard key={guide._id} guide={guide}></GuideCard>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default TourismGuide;
