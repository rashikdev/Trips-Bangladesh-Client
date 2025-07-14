import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getCloudinaryImgUrl } from "../../utils/utils";

import toast from "react-hot-toast";
import Swal from "sweetalert2";

const TouristProfile = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editModal, setEditModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    setIsUploading(true);
    const files = e.target.files;
    const uploadPromises = Array.from(files).map((file) =>
      getCloudinaryImgUrl(file)
    );
    try {
      const urls = await Promise.all(uploadPromises);
      setUploadedImage(urls[0]);
      setIsUploading(false);
    } catch (err) {
      toast.error("Failed to upload images.");
    }
  };

  const {
    data: userProfile = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });
  const handleUpdate = (e) => {
    e.preventDefault();
    setSaving(true);
    const form = e.target;
    const name = form.name.value || userProfile?.displayName;
    const image = uploadedImage || userProfile?.image;
    const rawInput = form.phoneNumber.value.trim().replace(/\s+/g, "");
    const number = rawInput;

    const languages = [...form.language]
      .filter((input) => input.checked)
      .map((input) => input.value);

    const isValid = /^\+8801[3-9][0-9]{8}$/.test(number);

    if (!number || !isValid) {
      setSaving(false);
      return toast.error(
        "Please enter a valid phone number with country code (+880)"
      );
    }
    if (languages.length < 1) {
      setSaving(false);
      return toast.error("Please select at least one language");
    }

    if (isUploading) {
      setSaving(false);
      return toast.error("Please wait, image is uploading...");
    }

    const updatedData = { name, image, number, languages };

    updateUser({
      displayName: name,
      photoURL: image,
    })
      .then(() => {
        axiosSecure
          .patch(`/users/${userProfile?._id}`, updatedData)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              setSaving(false);
              toast.success("Profile updated successfully");
              setEditModal(false);
            }
          })
          .catch((err) => {
            setSaving(false);
            setEditModal(false);
            toast.error("something went wrong try again");
          });
      })
      .catch((err) => {
        setSaving(false);
        toast.error("something went wrong try again");
      });
  };

  const { data: application = {} } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user?.email}`);
      return res.data;
    },
  });

  const isPending = application?.status === "pending";
  console.log(application);

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["userStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userStats?email=${user?.email}`);
      return res.data;
    },
  });


  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <section className="py-10 px-4 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-10">
      {/* User Profile info */}
      <div className="text-white md:px-10 px-3 relative">
        {/* Welcome Message */}
        <div className="text-center md:px-10 px-4 mb-6">
          <h1 className="text-4xl font-bold text-orange-400 mb-2">
            Welcome Back, Admin!
          </h1>
          <p className="text-white/80 text-lg">
            Here’s an overview of your dashboard activities and profile
            information.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-5 items-center bg-white/5 border border-white/10 py-12 rounded-xl shadow-md backdrop-blur">
          {/* Guide Image */}
          <div className="flex-1">
            <img
              src={userProfile?.image}
              alt={userProfile?.name}
              className="h-56 w-56 object-cover mx-auto rounded-full border-4 border-orange-500 shadow-lg"
            />
          </div>

          {/* user Details */}
          <div className="flex-1 text-left space-y-4">
            <h2 className="text-3xl font-bold text-primary">
              {userProfile?.name}
            </h2>

            <p>
              <span className="font-semibold text-gray-300">Email:</span>{" "}
              <span className="text-white">{userProfile?.email}</span>
            </p>

            <p>
              <span className="font-semibold text-gray-300">Phone:</span>{" "}
              <span className="text-white">
                {userProfile?.number ? (
                  userProfile?.number
                ) : (
                  <span className="text-sm text-red-500">Not Set yet</span>
                )}
              </span>
            </p>

            <p>
              <span className="font-semibold text-gray-300">Languages:</span>{" "}
              {userProfile?.languages ? (
                userProfile?.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="text-white text-sm font-semibold mr-2"
                  >
                    {lang},
                  </span>
                ))
              ) : (
                <span className="text-sm text-red-500">Not Set yet</span>
              )}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Role:</span>{" "}
              <span className="text-white bg-green-600 px-2 py-[2px] text-sm rounded-md font-semibold">
                {userProfile?.role}
              </span>
            </p>
          </div>
        </div>
        <div className="absolute space-x-4 bottom-3 right-14">
          <button
            onClick={() => setEditModal(true)}
            className="btn btn-primary bg-white text-black border-none shadow-none hover:bg-gray-400"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Admin State Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        <div className="bg-white/10 border border-white/10 p-6 rounded-xl backdrop-blur shadow-md hover:scale-[1.02] transition">
          <h4 className="text-lg font-semibold text-orange-400 mb-2">
            Total Payment
          </h4>
          <p className="text-2xl font-bold">৳ 1,25,000</p>
          <p className="text-white/60 text-sm mt-1">All-time user payments</p>
        </div>

        <div className="bg-white/10 border border-white/10 p-6 rounded-xl backdrop-blur shadow-md hover:scale-[1.02] transition">
          <h4 className="text-lg font-semibold text-orange-400 mb-2">
            Total Tour Guides
          </h4>
          <p className="text-2xl font-bold">34</p>
          <p className="text-white/60 text-sm mt-1">
            Verified and active guides
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 p-6 rounded-xl backdrop-blur shadow-md hover:scale-[1.02] transition">
          <h4 className="text-lg font-semibold text-orange-400 mb-2">
            Total Packages
          </h4>
          <p className="text-2xl font-bold">58</p>
          <p className="text-white/60 text-sm mt-1">Available for booking</p>
        </div>

        <div className="bg-white/10 border border-white/10 p-6 rounded-xl backdrop-blur shadow-md hover:scale-[1.02] transition">
          <h4 className="text-lg font-semibold text-orange-400 mb-2">
            Total Clients
          </h4>
          <p className="text-2xl font-bold">120</p>
          <p className="text-white/60 text-sm mt-1">Registered tourists</p>
        </div>

        <div className="bg-white/10 border border-white/10 p-6 rounded-xl backdrop-blur shadow-md hover:scale-[1.02] transition">
          <h4 className="text-lg font-semibold text-orange-400 mb-2">
            Total Stories
          </h4>
          <p className="text-2xl font-bold">76</p>
          <p className="text-white/60 text-sm mt-1">Shared by users</p>
        </div>
      </div>

      {/* Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-md px-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white/10 border border-white/20 p-8 rounded-2xl w-full max-w-md shadow-xl space-y-5"
          >
            <h3 className="text-2xl font-bold text-center mb-2">
              Edit Your Profile
            </h3>

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={userProfile?.name}
                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                defaultValue={userProfile?.number}
                placeholder="+880 XXXXXXXXX"
                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none"
              />
            </div>
            <p className="text-sm font-medium mb-2">Languages you speak</p>
            <div className="flex gap-7">
              <div>
                <input
                  type="checkbox"
                  id="English"
                  name="language"
                  defaultChecked={userProfile?.languages?.includes("English")}
                  value="English"
                  className="accent-primary mr-1"
                />
                <label htmlFor="English">English</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="Bengali"
                  name="language"
                  defaultChecked={userProfile?.languages?.includes("Bengali")}
                  value="Bengali"
                  className="accent-primary mr-1"
                />
                <label htmlFor="Bengali">Bengali</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="Hindi"
                  name="language"
                  defaultChecked={userProfile?.languages?.includes("Hindi")}
                  value="Hindi"
                  className="accent-primary mr-1"
                />
                <label htmlFor="Hindi">Hindi</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleUpload}
                className="w-full px-3 py-1 rounded-md  border border-white/30 text-white file:text-white file:bg-primary file:border-none file:px-4 file:py-1 file:rounded file:cursor-pointer focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 font-semibold">
              <button
                type="button"
                onClick={() => setEditModal(false)}
                className="px-4 py-2 rounded border border-gray-400 hover:border-orange-500 text-sm transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-white text-black cursor-pointer"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default TouristProfile;
