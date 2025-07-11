import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { CiMenuKebab } from "react-icons/ci";
import ManageStoryCard from "./ManageStoryCard";
import toast from "react-hot-toast";
import { getCloudinaryImgUrl } from "../../utils/utils";

const ManageStories = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isUploading, setUploading] = useState(false);
  const [uploadingStoryId, setUploadingStoryId] = useState(null);

  // const handleDeleteStory = (id) => {
  //   setStories(stories.filter((story) => story._id !== id));
  // };

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
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <ManageStoryCard
            story={story}
            key={story._id}
            handleRemoveImage={handleRemoveImage}
            handleAddImages={handleAddImages}
            uploadingStoryId={uploadingStoryId}
          />
        ))}
      </div>
    </section>
  );
};

export default ManageStories;
