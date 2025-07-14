import React from "react";
import { PiShareFatThin } from "react-icons/pi";

const StoryCard = ({ story }) => {
  const [mainImage, ...otherImages] = story.images;
  // console.log(story)
  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur-md flex flex-col justify-between">
      {/* Author */}
      <div className="flex items-center gap-4 mb-4 relative">
        <img
          src={story.authorImage}
          alt={story.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{story.author}</p>
          <p className="text-sm text-gray-300">{story.authorEmail}</p>
        </div>
        <button className="absolute top-0 right-0 text-sm text-gray-300 flex items-center cursor-pointer gap-1 px-2 py-1 border-[1.5px] hover:border-primary border-gray-700 rounded-full">
          <PiShareFatThin />
          Share
        </button>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3">{story.title}</h3>

      {/* Content */}
      <p className="text-sm text-gray-300 mb-4">{story.content}</p>

      <div className="h-[300px] overflow-y-scroll">
        {/* Main Image */}
        {mainImage && (
          <img
            src={mainImage}
            alt="Main"
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
        )}

        {/* Other Images */}
        {otherImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {otherImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                className="h-20 object-cover rounded-md transition-transform"
              />
            ))}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default StoryCard;
