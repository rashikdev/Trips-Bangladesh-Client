import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router";

const ManageStoryCard = ({
  story,
  handleRemoveImage,
  handleAddImages,
  uploadingStoryId,
  handleDeleteStory,
  refetch,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    refetch();
  }, [story]);

  return (
    <div className="bg-white/10 rounded-xl p-4 shadow-md space-y-4 py-8">
      <div className="flex justify-between relative">
        <div className="flex items-center gap-3">
          <img
            src={story.authorImage}
            alt={story.author}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{story.author}</p>
            <p className="text-sm text-gray-300">{story.authorEmail}</p>
          </div>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hover:bg-gray-700 bg-gray-900 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer"
        >
          <CiMenuKebab size={22} />
        </button>
        {menuOpen && (
          <ul className="absolute top-10 right-0 bg-gray-500 p-3 rounded w-34 *:cursor-pointer">
            <Link to={`/dashboard/updateStory/${story._id}`}>
              <li className="text-white mb-2 bg-gray-900 pl-2 rounded-md hover:bg-gray-800">
                Edit Story
              </li>
            </Link>
            <li
              onClick={() => handleDeleteStory(story._id)}
              className="text-red-600 bg-gray-900 pl-2 rounded-md hover:bg-gray-800"
            >
              Delete
            </li>
          </ul>
        )}
      </div>

      <h3 className="text-xl font-bold">{story.title}</h3>
      <p className="text-sm text-gray-300">{story.content}</p>

      <div className="grid grid-cols-3 gap-2 overflow-y-scroll max-h-24">
        {story.images.map((img, i) => (
          <div key={i} className="relative">
            <img
              src={img}
              alt="story-img"
              className="w-full h-24 object-cover rounded"
            />
            <button
              onClick={() => handleRemoveImage(story._id, img)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={(e) => handleAddImages(e, story._id)}>
        <span className="block mb-2">Add Images:</span>
        <div className="flex justify-between items-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleAddImages(e, story._id)}
            className="text-white text-xs bg-slate-700 rounded px-2 py-1 file:bg-secondary file:text-white file:border-none file:rounded file:px-3 file:py-1 cursor-pointer"
          />
          {uploadingStoryId === story._id && (
            <span className="loading loading-spinner text-success mr-4"></span>
          )}
        </div>
      </form>
    </div>
  );
};

export default ManageStoryCard;
