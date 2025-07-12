import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ManageStoryCard from "./ManageStoryCard";
import toast from "react-hot-toast";
import { getCloudinaryImgUrl } from "../../utils/utils";

const ManageStories = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isUploading, setUploading] = useState(false);
  const [uploadingStoryId, setUploadingStoryId] = useState(null);

  const handleDeleteStory = (id) => {
    axiosSecure
      .delete(`/stories/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          refetch();
          toast.success("Story deleted successfully.");
        }
      })
      .catch((err) => toast.error("Failed to delete story."));
  };

  const handleRemoveImage = async (storyId, imageUrl) => {
    try {
      await axiosSecure
        .patch(`/stories/${storyId}/action`, {
          imageUrl,
          action: "remove",
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("Image removed successfully.");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddImages = async (e, storyId) => {
    e.preventDefault();
    setUploading(true);
    const files = e.target.files;
    const uploadPromises = Array.from(files).map((file) =>
      getCloudinaryImgUrl(file)
    );
    try {
      setUploadingStoryId(storyId);
      const urls = await Promise.all(uploadPromises);
      await axiosSecure
        .patch(`/stories/${storyId}/action`, {
          newImages: urls,
          action: "add",
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            setUploading(false);
            toast.success("Image added successfully.");
          }
        })
        .catch((err) => toast.error("Failed to add image."));
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setUploadingStoryId(null);
      setUploading(false);
      e.target.value = null;
    }
  };

  const {
    data: stories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stories", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return "Loading...";

  return (
    <section className="p-6 bg-slate-900 min-h-screen text-white mt-10">
      {stories.length === 0 ? (
        <div className="bg-white/10 p-8 rounded-lg text-center shadow-md border border-white/20 max-w-md flex flex-col items-center mx-auto mt-10">
          <h2 className="text-2xl font-semibold mb-3">No Stories Yet</h2>
          <p className="text-gray-300 mb-2">
            You haven't added any stories yet.
          </p>
          <p className="text-sm text-gray-500">
            Share your travel experiences by adding a new story!
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <ManageStoryCard
              key={story._id}
              story={story}
              handleRemoveImage={handleRemoveImage}
              handleAddImages={handleAddImages}
              uploadingStoryId={uploadingStoryId}
              handleDeleteStory={handleDeleteStory}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageStories;
