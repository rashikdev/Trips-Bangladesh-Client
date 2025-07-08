import React from "react";
import Banner from "../components/Banner";
import OverviewSection from "../components/overview/OverviewSection";
import TourismGuide from "../components/tourismAndTravelGuide/TourismGuide";
import TouristStorySection from "../components/touristStory/TouristStorySection";

const Home = () => {
  return (
    <div>
      <Banner />
      <OverviewSection />
      <TourismGuide />
      <TouristStorySection />
    </div>
  );
};

export default Home;
