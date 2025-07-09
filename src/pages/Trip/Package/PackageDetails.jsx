import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowAltCircleDown, FaArrowDown } from "react-icons/fa";
import TourPlan from "../tourPlane/TourPlan";
import TourGuidSlider from "../TourGuidSlider/TourGuidSlider";
import BookingForm from "./BookingForm";

const PackageDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: singlepackage = {}, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/package/${id}`);
      return res.data;
    },
  });
  const { images, thumbnail, description, tourType, price, duration, title } =
    singlepackage;

  const { data: guides = [], isLoading: guidesLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/guides");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center text-white h-screen">Loading...</div>;
  }

  return (
    <section className="min-h-screen px-4 md:px-10 text-white pt-30">
      <div className="*:border flex flex-col md:flex-row gap-4">
        {/* large thumbnail */}
        <div className="md:flex-3">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-full min-h-[750px]"
          />
        </div>

        {/* details with images */}
        <div className="md:flex-5 p-10">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg max-w-2xl">{description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              {/* Price */}
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-center shadow-md hover:shadow-lg transition">
                <h4 className="text-lg font-semibold text-white/70 mb-2">
                  Price
                </h4>
                <p className="text-2xl font-bold text-orange-400">${price}</p>
              </div>

              {/* Duration */}
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-center shadow-md hover:shadow-lg transition">
                <h4 className="text-lg font-semibold text-white/70 mb-2">
                  Duration
                </h4>
                <p className="text-2xl font-bold text-orange-400">3 days</p>
              </div>

              {/* Tour Type */}
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 text-center shadow-md hover:shadow-lg transition">
                <h4 className="text-lg font-semibold text-white/70 mb-2">
                  Tour Type
                </h4>
                <p className="text-2xl font-bold text-orange-400">{tourType}</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold my-4">
                Tour Gallery – Explore the Stunning Views You'll Visit
              </h3>
              <div className="flex gap-8">
                {Array.isArray(images) &&
                  images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-80 object-cover rounded-lg border"
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tour plan */}
      <div>
        <TourPlan />
      </div>
      {/* Trour Guide */}
      <div>
        <TourGuidSlider guides={guides} guidesLoading={guidesLoading} />
      </div>
      {/* Booking Form */}
      <div>
        <BookingForm singlepackage={singlepackage} guides={guides} />
      </div>
    </section>
  );
};

export default PackageDetails;
