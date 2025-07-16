import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { getCloudinaryImgUrl } from "../../utils/utils";
import toast from "react-hot-toast";

const UpdateStory = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const {
    data: story = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/story/${id}`);
      return res.data;
    },
  });

  const handleUploadImage = async (e) => {
    setIsImageUploading(true);
    const files = e.target.files;
    const uploadPromises = Array.from(files).map((file) =>
      getCloudinaryImgUrl(file)
    );
    try {
      const urls = await Promise.all(uploadPromises);
      setIsImageUploading(false);
      setUploadedImages(urls);
    } catch (err) {
      toast.error("Failed to upload images.");
      setIsImageUploading(false);
    }
  };

  const { author, authorImage, authorEmail } = story;
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;
    const newImages = uploadedImages;
    const images = newImages ? newImages : story?.images;
    const updatedStory = {
      title,
      content,
      images,
      author,
      authorImage,
      authorEmail,
    };

    if (isImageUploading) {
      return toast.error("Please wait for images to upload.");
    }
    // save the updated story
    try {
      axiosSecure
        .put(`/stories/${id}`, updatedStory)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            setUploading(false);
            refetch();
            navigate("/dashboard/manageStories");
            toast.success("Story updated successfully.");
          }
        })
        .catch((err) => {
          toast.error("Failed to update story.");
        });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="min-h-screen py-16 px-6 md:px-12 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/20 p-8 rounded-xl shadow-xl backdrop-blur-md">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Update Your Story
        </h2>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={story?.title}
              placeholder="Enter story title"
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1">Story</label>
            <textarea
              rows="6"
              name="content"
              defaultValue={story?.content}
              placeholder="Update your trip experience..."
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1">Add More Images</label>
            <input
              type="file"
              name="files"
              multiple
              accept="image/*"
              onChange={handleUploadImage}
              className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white file:text-white file:bg-teal-500 file:border-none file:px-4 file:py-1 file:rounded file:cursor-pointer focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isImageUploading}
            className={`w-full py-2 rounded-md font-semibold transition cursor-pointer ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {uploading ? "Updating..." : "Update Story"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateStory;
