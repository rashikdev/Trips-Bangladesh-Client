import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaArrowAltCircleDown, FaArrowDown } from "react-icons/fa";
import TourPlan from "../tourPlane/TourPlan";
import TourGuidSlider from "../TourGuidSlider/TourGuidSlider";
import BookingForm from "./BookingForm";
import LoadingSpinner from "../../../components/loadingPage/LoadingSpinner";

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
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <section className="min-h-screen px-4 md:px-10 text-white pt-30">
      <div className="flex flex-col md:flex-row gap-4 md:h-[60vh]">
        {/* large thumbnail */}
        <div className="w-full md:w-2/5 h-64 md:h-full">
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* details with images */}
        <div className="w-full md:w-3/5 overflow-y-auto">
          <div className="flex flex-col h-full gap-8 justify-between md:px-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
              <p className="text-base md:text-lg text-white/80">
                {description}
              </p>
            </div>

            <div className="flex flex-col-reverse md:flex-col justify-around h-full gap-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-primary text-center shadow-md">
                  <h4 className="text-sm md:text-base font-semibold text-white/70 mb-2">
                    Price
                  </h4>
                  <p className="text-xl font-bold text-orange-400">${price}</p>
                </div>

                {/* Duration */}
                <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-primary text-center shadow-md">
                  <h4 className="text-sm md:text-base font-semibold text-white/70 mb-2">
                    Duration
                  </h4>
                  <p className="text-xl font-bold text-orange-400">3 days</p>
                </div>

                {/* Tour Type */}
                <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-primary text-center shadow-md">
                  <h4 className="text-sm md:text-base font-semibold text-white/70 mb-2">
                    Tour Type
                  </h4>
                  <p className="text-xl font-bold text-orange-400">
                    {tourType}
                  </p>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-8">
                  Tour Gallery – Explore the Stunning Views You'll Visit
                </h3>
                <div className="flex gap-5 overflow-x-auto mt-4">
                  {Array.isArray(images) &&
                    images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-63 h-40 object-cover rounded-lg shrink-0"
                      />
                    ))}
                </div>
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
      <div className="mt-10">
        <BookingForm singlepackage={singlepackage} guides={guides} />
      </div>
    </section>
  );
};

export default PackageDetails;
