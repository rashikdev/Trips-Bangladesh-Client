import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState(null);
  const [tourGuides, setTourGuides] = useState([]);

  useEffect(() => {
    // Fetch package data
    axios.get(`/packages/${id}`).then((res) => {
      setPackageData(res.data);
    });

    // Fetch tour guides list
    axios.get("/tour-guides").then((res) => {
      setTourGuides(res.data);
    });
  }, [id, axios]);

  if (!packageData) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }

  const { title, description, images, price, tourType, daysPlan } = packageData;

  return (
    <section className="min-h-screen px-4 md:px-10 py-12 text-white">
      {/* Gallery Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`place-${index}`}
            className="w-full h-60 object-cover rounded-lg shadow"
          />
        ))}
      </div>

      {/* About Tour */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-10 border border-white/20">
        <h2 className="text-3xl font-bold mb-4">About The Tour</h2>
        <p className="text-white/80 text-lg leading-relaxed">{description}</p>
        <div className="mt-4 text-sm text-white/70">
          <p>
            <strong>Tour Type:</strong> {tourType}
          </p>
          <p>
            <strong>Price:</strong> ${price}
          </p>
        </div>
      </div>

      {/* Tour Plan */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg mb-10 border border-white/20">
        <h2 className="text-3xl font-bold mb-4">Tour Plan</h2>
        <ul className="list-disc list-inside space-y-2 text-white/80">
          {daysPlan?.map((day, idx) => (
            <li key={idx}>
              <strong>Day {idx + 1}:</strong> {day}
            </li>
          ))}
        </ul>
      </div>

      {/* Tour Guides */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
        <h2 className="text-3xl font-bold mb-6">Meet Our Tour Guides</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {tourGuides.map((guide) => (
            <div
              key={guide._id}
              onClick={() => navigate(`/tour-guides/${guide._id}`)}
              className="cursor-pointer bg-white/20 p-4 rounded-lg text-center hover:shadow-xl transition border border-white/30"
            >
              <img
                src={guide.photo}
                alt={guide.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-2 border"
              />
              <h3 className="text-lg font-semibold">{guide.name}</h3>
              <p className="text-sm text-white/70">
                {guide.specialty || "Tour Expert"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;
