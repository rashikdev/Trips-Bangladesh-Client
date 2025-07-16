import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getCloudinaryImgUrl } from "../../utils/utils";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/loadingPage/LoadingSpinner";
import CountUp from "react-countup";

const GuideProfile = () => {
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

  const { data: stats = [] } = useQuery({
    queryKey: ["guideStates", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guideStats?email=${user?.email}`);
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

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <section className="py-10 px-4 min-h-screen  text-white space-y-18">
      {/* User Profile info */}
      <div className="text-white md:w-11/12 mx-auto md:px-10 px-3 relative">
        <h3 className="text-2xl font-bold mb-6 text-center text-primary">
          Welcome To Your Profile
        </h3>

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
              <span className="text-white">{userProfile?.number}</span>
            </p>

            <p>
              <span className="font-semibold text-gray-300">Languages:</span>{" "}
              {userProfile?.languages.map((lang, index) => (
                <span
                  key={index}
                  className="text-white text-sm font-semibold mr-2"
                >
                  {lang},
                </span>
              ))}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Role:</span>{" "}
              <span className="text-white bg-green-500 px-3 py-[2px] text-sm rounded-full font-semibold capitalize">
                {userProfile?.role}
              </span>
            </p>
          </div>
        </div>
        <div className="absolute space-x-4 md:top-30 md:right-16 top-18 right-6">
          <button
            onClick={() => setEditModal(true)}
            className="text-sm px-2 py-1 bg-primary text-white border-none shadow-none hover:bg-gray-400 rounded font-semibold"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* guide stats */}
      <div className="grid md:grid-cols-3 gap-10 text-white md:w-11/12 mx-auto md:px-10 px-3">
        {/* Assigned Tours */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md text-center shadow">
          <h3 className="text-lg font-semibold">Assigned Tours</h3>
          <p className="text-3xl font-bold mt-2 text-blue-500">
            <CountUp end={stats.assigned || 0} duration={1.5} separator="," />
          </p>
        </div>

        {/* Accepted Requests */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md text-center shadow">
          <h3 className="text-lg font-semibold">
            Accepted Requests
          </h3>
          <p className="text-3xl font-bold mt-2 text-green-400">
            <CountUp end={stats.accepted || 0} duration={1.5} separator="," />
          </p>
        </div>

        {/* Rejected Requests */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md text-center shadow">
          <h3 className="text-lg font-semibold">
            Rejected Requests
          </h3>
          <p className="text-3xl font-bold mt-2 text-red-500">
            <CountUp end={stats.rejected || 0} duration={1.5} separator="," />
          </p>
        </div>

        {/* Total Posts */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md text-center shadow">
          <h3 className="text-lg font-semibold">Total Posts</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-400">
            <CountUp end={stats.posts || 0} duration={1.5} separator="," />
          </p>
        </div>

        {/* Total Earnings */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-md text-center shadow">
          <h3 className="text-lg font-semibold">
            Total Earnings
          </h3>
          <p className="text-3xl font-bold mt-2">
            <CountUp end={stats.earnings || 0} duration={1.5} separator="," className="text-green-500"/> BDT
          </p>
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

export default GuideProfile;
