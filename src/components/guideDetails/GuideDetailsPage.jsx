import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import StoryCard from "../../pages/Community/StoryCard";

const GuideDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: Guide = {}, isLoading } = useQuery({
    queryKey: ["guide", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guide/${id}`);
      return res.data;
    },
  });
  const { data: stories = [], isLoading: storyLoading } = useQuery({
    queryKey: ["stories", Guide?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories?email=${Guide?.email}`);
      return res.data;
    },
  });

  const { name, email, image, experience, languages, phone, rating } = Guide;

  if (isLoading) {
    return <div className="text-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-30 text-white md:w-11/12 mx-auto md:px-10 px-3">
      <div className="flex flex-col md:flex-row gap-10 items-center bg-white/5 border border-white/10 py-12 rounded-xl shadow-md backdrop-blur">
        {/* Guide Image */}
        <div className="flex-1">
          <img
            src={image}
            alt={name}
            className="h-60 w-60 object-cover mx-auto rounded-full border-4 border-orange-500 shadow-lg"
          />
        </div>

        {/* Guide Details */}
        <div className="flex-1 text-left space-y-4">
          <h2 className="text-3xl font-bold text-primary">{name}</h2>

          <p>
            <span className="font-semibold text-gray-300">Email:</span>{" "}
            <span className="text-white">{email}</span>
          </p>

          <p>
            <span className="font-semibold text-gray-300">Phone:</span>{" "}
            <span className="text-white">{phone}</span>
          </p>

          <p>
            <span className="font-semibold text-gray-300">Experience:</span>{" "}
            {experience}+ years
          </p>

          <p>
            <span className="font-semibold text-gray-300">Languages:</span>{" "}
            {Array.isArray(languages) ? languages.join(", ") : languages}
          </p>

          <p>
            <span className="font-semibold text-gray-300">Rating:</span> ⭐{" "}
            {rating}
          </p>
        </div>
      </div>

      {/* Stories Section Placeholder */}
      <div className="mt-12 border border-white/10 rounded-xl bg-white/5 p-6 backdrop-blur">
        <h2 className="text-2xl font-bold text-primary mb-4">Stories</h2>
        {storyLoading ? (
          <div>
            <p className="text-white/80 italic">Loading stories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
            {stories.length === 0 && (
              <p className="text-white/80 italic">No stories shared yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuideDetailsPage;
