import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { getImgUrl } from "../../utils/utils";
import { set } from "react-hook-form";
import toast from "react-hot-toast";

const TouristProfile = () => {
  const { user, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editModal, setEditModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const image = await getImgUrl(e.target.files[0]);
    setUploadedImage(image);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setSaving(true);
    const form = e.target;
    const name = form.name.value || user?.displayName;
    const photoURL = uploadedImage || user?.photoURL;
    updateUser({
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        setSaving(false);
        toast.success("Profile updated successfully");
        setEditModal(false);
      })
      .catch((err) => toast.error("something went wrong try again"));
  };

  const { data: application = {} } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user?.email}`);
      return res.data;
    },
  });

  const isPending = application[0]?.status === "pending";
  return (
    <section className="py-20 px-4 md:px-10 min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-5xl mx-auto bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold mb-10 text-center">
          Welcome,{" "}
          <span className="text-primary">
            {user?.displayName?.split(" ")[0]}
          </span>
          !
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Profile Picture */}
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-orange-400 shadow-md"
          />

          {/* Info Section */}
          <div className="flex-1 space-y-3 text-lg">
            <p>
              <span className="font-semibold text-orange-400">Name:</span>{" "}
              {user?.displayName}
            </p>
            <p>
              <span className="font-semibold text-orange-400">Email:</span>{" "}
              {user?.email}
            </p>
            <p>
              <span className="font-semibold text-orange-400">Role:</span>{" "}
              <span className="bg-green-600 px-2 py-[1px] rounded text-sm font-medium">
                Tourist
              </span>
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setEditModal(true)}
                className="px-4 py-1 rounded bg-white text-slate-900 font-semibold hover:bg-slate-100 transition cursor-pointer"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/dashboard/guideApplication")}
                disabled={isPending}
                className={`px-4 py-1 rounded font-semibold transition ${
                  isPending
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                }`}
              >
                {isPending ? "Pending Application" : "Apply as a Guide"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Stats Placeholder Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
        <div className="h-40 bg-white/10 border border-white/20 rounded-xl backdrop-blur-lg"></div>
        <div className="h-40 bg-white/10 border border-white/20 rounded-xl backdrop-blur-lg"></div>
        <div className="h-40 bg-white/10 border border-white/20 rounded-xl backdrop-blur-lg"></div>
      </div>

      {/* Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm px-4">
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
                defaultValue={user?.displayName}
                className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleUpload}
                className="w-full px-3 py-1 rounded-md  border border-white/30 text-white file:text-white file:bg-teal-500 file:border-none file:px-4 file:py-1 file:rounded file:cursor-pointer focus:outline-none"
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
