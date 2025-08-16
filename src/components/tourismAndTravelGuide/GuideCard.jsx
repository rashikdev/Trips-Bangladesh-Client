import React from "react";
import { Link } from "react-router";

const GuideCard = ({ guide }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md hover:shadow-2xl transition hover:border hover:border-orange-500">
      <img
        src={guide.image}
        alt={guide.name}
        className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white mb-4"
      />
      <h3 className="text-xl font-semibold text-center">{guide.name}</h3>
      <p className="text-center text-sm dark:text-white/70">
        Experience: {guide.experience} years
      </p>
      <p className="text-center text-sm dark:text-white/70">
        Languages: {guide.languages.join(", ")}
      </p>
      <div className="mt-4 text-center">
        <Link to={`/guide/${guide._id}`}>
          <button className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2 rounded-full text-sm transition cursor-pointer">
            View Details →
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GuideCard;
