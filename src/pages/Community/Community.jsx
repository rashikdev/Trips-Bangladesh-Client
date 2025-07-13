import React from "react";

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
];

const Community = () => {
  return (
    <section className="min-h-screen py-26 px-6 md:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Community Stories
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {demoStories.map((story) => {
            const [mainImage, ...otherImages] = story.images;

            return (
              <div
                key={story._id}
                className="bg-white/10 p-6 rounded-xl border border-white/20 shadow-md backdrop-blur-md"
              >
                {/* Author */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={story.authorImage}
                    alt={story.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{story.author}</p>
                    <p className="text-sm text-gray-300">{story.authorEmail}</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3">{story.title}</h3>

                <div className="h-[300px] overflow-y-scroll">
                  {/* Main Image */}
                  {mainImage && (
                    <img
                      src={mainImage}
                      alt="Main"
                      className="w-full h-48 object-cover rounded-lg mb-3 border"
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
                          className="h-20 object-cover rounded-md transition-transform border"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Content */}
                <p className="text-sm text-gray-300 line-clamp-3">
                  {story.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Community;
