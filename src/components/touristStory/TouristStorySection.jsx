import React from "react";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import StoryCard from "../../pages/Community/StoryCard";

const TouristStorySection = ({ stories = [] }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: randomStories = [], isLoading } = useQuery({
    queryKey: ["randomStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/random-stories");
      return res.data;
    },
  });

  console.log(randomStories);

  return (
    <section className="px-4 md:px-10 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-orange-500 mb-4">
            Tourist Stories
          </h2>
          <p className="text-gray-600 mb-10">
            Discover amazing experiences shared by fellow travelers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {randomStories.map((story) => (
            <StoryCard key={story._id} story={story}></StoryCard>
          ))}
        </div>

        <button
          onClick={() => navigate("/community/stories")}
          className="mt-10 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition flex items-center mx-auto cursor-pointer"
        >
          View All Stories <FaArrowRight className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default TouristStorySection;
