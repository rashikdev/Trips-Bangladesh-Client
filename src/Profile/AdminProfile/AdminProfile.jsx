import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const [editModal, setEditModal] = useState(false);

  const admin = {
    name: "Tofajjal Hossain",
    email: "admin@example.com",
    role: "admin",
    image: "https://i.pravatar.cc/150?img=32",
    phone: "+8801723456789",
    address: "Dhaka, Bangladesh",
  };

  const stats = {
    totalPayments: 125000,
    totalTourGuides: 15,
    totalPackages: 28,
    totalClients: 140,
    totalStories: 52,
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedAdmin = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
    };
    console.log(updatedAdmin);

    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      showConfirmButton: false,
      timer: 1200,
    });

    setEditModal(false);
  };

  return (
    <section className="min-h-screen px-6 py-12 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Welcome Text */}
        <h2 className="text-3xl font-bold text-center">
          Welcome, {admin.name} 👋
        </h2>

        {/* Admin Info Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-6">
          <img
            src={admin.image}
            alt={admin.name}
            className="w-28 h-28 rounded-full border-4 border-teal-500 shadow"
          />
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-semibold">{admin.name}</h3>
            <p className="text-gray-300">📧 {admin.email}</p>
            <p className="text-gray-300">📱 {admin.phone}</p>
            <p className="text-gray-300">📍 {admin.address}</p>
            <p className="text-sm text-teal-400 uppercase tracking-wide font-semibold">
              {admin.role}
            </p>
          </div>
          <button
            onClick={() => setEditModal(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
          >
            <MdEdit /> Edit
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total Payments"
            value={`৳ ${stats.totalPayments.toLocaleString()}`}
            color="bg-indigo-600"
          />
          <StatCard
            label="Tour Guides"
            value={stats.totalTourGuides}
            color="bg-emerald-600"
          />
          <StatCard
            label="Packages"
            value={stats.totalPackages}
            color="bg-cyan-600"
          />
          <StatCard
            label="Clients"
            value={stats.totalClients}
            color="bg-orange-600"
          />
          <StatCard
            label="Stories"
            value={stats.totalStories}
            color="bg-pink-600"
          />
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-xl w-[90%] max-w-md space-y-4 relative">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Edit Profile
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="name"
                defaultValue={admin.name}
                placeholder="Name"
                className="w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none"
              />
              <input
                type="text"
                name="phone"
                defaultValue={admin.phone}
                placeholder="Phone"
                className="w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none"
              />
              <input
                type="text"
                name="address"
                defaultValue={admin.address}
                placeholder="Address"
                className="w-full px-4 py-2 rounded bg-white/10 text-white focus:outline-none"
              />
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-teal-500 hover:bg-teal-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

// Single Stat Card Component
const StatCard = ({ label, value, color }) => (
  <div className={`p-5 rounded-xl shadow-lg text-white ${color}`}>
    <h4 className="text-sm font-medium opacity-80">{label}</h4>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

export default AdminProfile;
