import React from "react";
import Banner from "../components/Banner";
import OverviewSection from "../components/overview/OverviewSection";
import TourismGuide from "../components/tourismAndTravelGuide/TourismGuide";
import TouristStorySection from "../components/touristStory/TouristStorySection";
import FaqSection from "../components/faqSection/FaqSection";
import ContactUsSection from "../components/contactUs/ContactUsSection ";

const Home = () => {
  return (
    <div>
      <Banner />
      <OverviewSection />
      <TourismGuide />
      <TouristStorySection />
      <FaqSection />
      <ContactUsSection />
    </div>
  );
};

export default Home;
