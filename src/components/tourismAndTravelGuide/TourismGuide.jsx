import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import GuideCard from "./GuideCard";
import PackageCard from "../Shared/PackageCard";

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
    <section className="max-w-7xl mx-auto mb-20">
      <Tabs className="p-5 md:p-0">
        <TabList className="flex border-b border-orange-600 mb-10">
          <Tab
            className="flex items-center gap-2 px-6 py-3 cursor-pointer"
            selectedClassName="text-orange-700  font-semibold outline-none"
          >
            Our Packages
          </Tab>

          <Tab
            className="flex items-center gap-2 px-6 py-3 cursor-pointer"
            selectedClassName="text-orange-700  font-semibold outline-none"
          >
            Meet Our Tour Guides
          </Tab>
        </TabList>

        <TabPanel>
          {/* Content for Level 1 Course */}
          <div className="grid md:grid-cols-3 gap-6">
            {randomPackages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg}></PackageCard>
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
