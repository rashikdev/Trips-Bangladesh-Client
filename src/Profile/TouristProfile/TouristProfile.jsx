import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const TouristProfile = () => {
  const { user } = useAuth();
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    setEditModal(false);
  };

  return (
    <section className="py-16 px-4 md:px-10  min-h-screen text-white">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Welcome,{" "}
          <span className="text-teal-300">
            {user?.displayName?.split(" ")[0]}
          </span>
          !
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-white/30 shadow-md"
          />

          {/* Info */}
          <div className="flex-1 space-y-3">
            <p>
              <span className="font-semibold">Name:</span> {user?.displayName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-semibold">Role:</span>{" "}
              <span className="bg-teal-600 px-2 py-1 rounded text-sm font-medium">
                {user?.role || "Tourist"}
              </span>
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-5">
              <button
                onClick={() => setEditModal(true)}
                className="px-5 py-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/join-tour-guide")}
                className="px-5 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 font-semibold transition"
              >
                Apply for Tour Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-20 *:border">
        <div className="flex-1 h-60"></div>
        <div className="flex-1 h-60"></div>
        <div className="flex-1 h-60"></div>
      </div>

      {/* Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm px-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white text-black p-6 md:p-8 rounded-2xl w-full max-w-md shadow-xl space-y-4"
          >
            <h3 className="text-2xl font-bold text-center mb-2">
              Edit Your Profile
            </h3>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Photo URL
              </label>
              <input
                type="text"
                value={formData.photoURL}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, photoURL: e.target.value }))
                }
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setEditModal(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default TouristProfile;
