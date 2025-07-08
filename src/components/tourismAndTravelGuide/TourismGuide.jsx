import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TourismGuide = () => {
  // your data fetching here...

  const demoPackages = [
    {
      _id: "pkg1",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      type: "Adventure",
      title: "Sundarbans Safari Tour",
      price: 15000,
    },
    {
      _id: "pkg2",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      type: "Cultural",
      title: "Dhaka Heritage Walk",
      price: 7000,
    },
    {
      _id: "pkg3",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
      type: "Beach",
      title: "Cox's Bazar Relaxation Package",
      price: 12000,
    },
  ];

  const demoGuides = [
    {
      _id: "guide1",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Rajib Ahmed",
      experience: 8,
      languages: ["Bengali", "English"],
    },
    {
      _id: "guide2",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Fatima Noor",
      experience: 5,
      languages: ["Bengali", "English", "Hindi"],
    },
    {
      _id: "guide3",
      image: "https://randomuser.me/api/portraits/men/56.jpg",
      name: "Hasan Mahmud",
      experience: 10,
      languages: ["Bengali", "French"],
    },
    {
      _id: "guide4",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      name: "Anika Rahman",
      experience: 7,
      languages: ["Bengali", "English", "Spanish"],
    },
    {
      _id: "guide5",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      name: "Sajid Karim",
      experience: 6,
      languages: ["Bengali", "English"],
    },
    {
      _id: "guide6",
      image: "https://randomuser.me/api/portraits/women/88.jpg",
      name: "Mousumi Das",
      experience: 9,
      languages: ["Bengali", "English", "German"],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-6 text-white">
      <Tabs className="">
        <TabList className="flex border-b border-purple-600 mb-10">
          <Tab
            className="flex items-center gap-2 px-6 py-3 cursor-pointer text-purple-400"
            selectedClassName="text-purple-700 border-t-2 border-l-2 border-r-2  border-purple-700 font-semibold outline-none rounded-[10px_10px_0px_0px]"
          >
            Our Packages
          </Tab>

          <Tab
            className="flex items-center gap-2 px-6 py-3 cursor-pointer text-purple-400"
            selectedClassName="text-purple-700 border-t-2 border-l-2 border-r-2 border-purple-700 font-semibold outline-none rounded-[10px_10px_0px_0px]"
          >
            Meet Our Tour Guides
          </Tab>
        </TabList>

        <TabPanel>
          {/* Content for Level 1 Course */}
          <div className="grid md:grid-cols-3 gap-6">
            {demoPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-52 w-full object-cover"
                />
                <div className="p-5 space-y-2">
                  <p className="text-sm text-teal-500 uppercase">{pkg.type}</p>
                  <h3 className="text-xl font-bold text-[#1b263b]">
                    {pkg.title}
                  </h3>
                  <p className="text-lg font-semibold text-gray-700">
                    ৳ {pkg.price}
                  </p>
                  <Link
                    to={`/packages/${pkg._id}`}
                    className="inline-block mt-3 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                  >
                    View Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          {/* Content for Conceptual Session */}
          <div className="grid md:grid-cols-3 gap-6">
            {demoGuides.map((guide) => (
              <div
                key={guide._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="h-52 w-full object-cover"
                />
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-bold text-[#1b263b]">
                    {guide.name}
                  </h3>
                  <p className="text-gray-600">
                    Experience: {guide.experience} years
                  </p>
                  <p className="text-gray-600">
                    Languages: {guide.languages.join(", ")}
                  </p>
                  <Link
                    to={`/guides/${guide._id}`}
                    className="inline-block mt-3 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default TourismGuide;
