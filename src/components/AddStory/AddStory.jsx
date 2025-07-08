import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { getImgUrl } from "../../utils/utils"; // must return uploaded image URL

const AddStory = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to submit a story.");
      return;
    }

    const files = data.images;
    if (!files || files.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    try {
      setUploading(true);
      const imageUploadPromises = Array.from(files).map((file) =>
        getImgUrl(file)
      );
      const imageUrls = await Promise.all(imageUploadPromises);

      const newStory = {
        title: data.title,
        content: data.content,
        images: imageUrls,
        author: {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        createdAt: new Date(),
      };

      console.log(newStory)

    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="min-h-screen py-16 px-6 md:px-12 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/20 p-8 rounded-xl shadow-xl backdrop-blur-md">
        <h2 className="text-3xl font-bold mb-8 text-center">Add Your Story</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter story title"
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
            {errors.title && (
              <p className="text-sm text-red-400">{errors.title.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1">Story</label>
            <textarea
              {...register("content", {
                required: "Story content is required",
              })}
              rows="6"
              placeholder="Share your travel experience..."
              className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            ></textarea>
            {errors.content && (
              <p className="text-sm text-red-400">{errors.content.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images", {
                required: "At least one image required",
              })}
              className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/30 text-white file:text-white file:bg-teal-500 file:border-none file:px-4 file:py-1 file:rounded file:cursor-pointer focus:outline-none"
            />
            {errors.images && (
              <p className="text-sm text-red-400">{errors.images.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 rounded-md font-semibold transition ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {uploading ? "Uploading..." : "Submit Story"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddStory;
