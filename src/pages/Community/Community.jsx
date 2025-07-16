import React from "react";
import StoryCard from "./StoryCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Community = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stories");
      return res.data;
    },
  });
  return (
    <section className="min-h-screen pt-26 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center my-5 text-primary">
          Community Stories
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pt-4">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} isLoading={isLoading}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
