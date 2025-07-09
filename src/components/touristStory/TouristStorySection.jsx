import React, { useEffect, useState } from "react";
// import { FacebookShareButton, FacebookIcon } from "react-share";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const TouristStorySection = () => {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Simulate fetching 4 random stories from your backend
  //   fetch("/api/stories/random?limit=4") // replace with your actual endpoint
  //     .then((res) => res.json())
  //     .then((data) => setStories(data))
  //     .catch((err) => console.error(err));
  // }, []);

  const handleShareClick = (storyUrl) => {
    if (!user) {
      navigate("/login");
    }
  };

  const demoStories = [
    {
      _id: 1,
      title: "title",
      userName: "Omuk",
      excerpt:
        "Explore iconic landmarks, hidden gems, local food, cultural traditions, and thrilling activities—all in one place. Plan smarter, travel deeper, and make every moment countExplore iconic landmarks, hidden gems, local food, cultural traditions, and thrilling activities—all in one place. Plan smarter, travel deeper, and make every moment count",
    },
    {
      _id: 2,
      title: "title",
      userName: "Omuk",
      excerpt:
        "Explore iconic landmarks, hidden gems, local food, cultural traditions, and thrilling activities—all in one place. Plan smarter, travel deeper, and make every moment countExplore iconic landmarks, hidden gems, local food, cultural traditions, and thrilling activities—all in one place. Plan smarter, travel deeper, and make every moment count",
    },
    {
      _id: 3,
      title: "title",
      userName: "Omuk",
      excerpt:
        "Explore iconic landmarks, hidden gems, local food, cultural traditions, and thrilling activities—all in one place. Plan smarter, travel deeper, and make every moment countExplore iconic landmarks, hidden gems, local food, cultural traditions, and thrilling activities—all in one place. Plan smarter, travel deeper, and make every moment count",
    },
    {
      _id: 4,
      title: "title",
      userName: "Omuk",
      excerpt:
        "Explore iconic landmarks, hidden gems, local food, cultural traditions, and thrilling activities—all in one place. Plan smarter, travel deeper, and make every moment countExplore iconic landmarks, hidden gems, local food, cultural traditions, and thrilling activities—all in one place. Plan smarter, travel deeper, and make every moment count",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#1b263b] to-[#0d1b2a] text-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Tourist Stories
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {demoStories.map((story) => (
            <div
              key={story._id}
              className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-2">{story.title}</h3>
              <p className="text-white/80 mb-3">
                {story.excerpt || story.description?.slice(0, 100)}...
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-white/60">
                  — {story.userName || "Anonymous"}
                </div>

                {/* {user ? (
                  <FacebookShareButton
                    url={`https://bdtravelguide.com/story/${story._id}`}
                    quote={story.title}
                    hashtag="#BDTravelGuide"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                ) : (
                  <button
                    onClick={() => handleShareClick()}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Login to Share
                  </button>
                )} */}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/all-stories">
            <button className="bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 transition">
              All Stories
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TouristStorySection;
