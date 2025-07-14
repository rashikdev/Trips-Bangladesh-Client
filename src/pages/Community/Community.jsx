import React from "react";
import StoryCard from "./StoryCard";

const demoStories = [
  {
    _id: "1",
    title: "Sundarban Tour Memories",
    content:
      "Exploring the world's largest mangrove forest was unforgettable. We saw Royal Bengal Tigers, crocodiles, and more!",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1629638572/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1629638571/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1629638573/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1629638574/sample.jpg",
    ],
    author: "Tofajjal",
    authorEmail: "tofajjalpdf@gmail.com",
    authorImage: "https://i.pravatar.cc/150?img=3",
  },
  {
    _id: "2",
    title: "Trip to Bandarban",
    content:
      "The hills, the sky, the clouds—Bandarban is pure heaven. If you love nature, this is the place to be!",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1629638572/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1629638571/sample.jpg",
    ],
    author: "Rashik",
    authorEmail: "rashik@gmail.com",
    authorImage: "https://i.pravatar.cc/150?img=5",
  },
  {
    _id: "3",
    title: "Sundarban Tour Memories",
    content:
      "Exploring the world's largest mangrove forest was unforgettable. We saw Royal Bengal Tigers, crocodiles, and more!",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1629638572/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1629638571/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1629638573/sample.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1629638574/sample.jpg",
    ],
    author: "Tofajjal",
    authorEmail: "tofajjalpdf@gmail.com",
    authorImage: "https://i.pravatar.cc/150?img=3",
  },
];

const Community = () => {
  return (
    <section className="min-h-screen py-26 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Community Stories
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {demoStories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
