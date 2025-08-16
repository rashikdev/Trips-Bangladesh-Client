import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Select from "react-select";
import Pagination from "../../components/Shared/Pagination";

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "tourist", label: "Tourist" },
  { value: "guide", label: "Tour Guide" },
];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 10;

  const axiosSecure = useAxiosSecure();

  const fetchUsers = async (role = "", searchText = "", page = 1) => {
    try {
      const roleQuery = role ? `role=${role}` : "";
      const searchQuery = searchText ? `search=${searchText}` : "";
      const pageQuery = `page=${page}&limit=${limit}`;
      const queryStr = [roleQuery, searchQuery, pageQuery]
        .filter(Boolean)
        .join("&");

      const res = await axiosSecure.get(`/users?${queryStr}`);
      setUsers(res.data.users);
      setTotalUsers(res.data.total);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(selectedRole.value, search, currentPage);
  }, [selectedRole, currentPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // reset page to 1
    fetchUsers(selectedRole.value, search, 1);
  };

  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <div className="h-full p-10">
      <h2 className="text-2xl font-semibold mb-5 text-primary">Manage Users</h2>

      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name or email..."
          className="flex-1 p-3 rounded dark:bg-white/20 outline-none border dark:border-white/30 border-zinc-400"
        />
        <Select
          className="text-black w-full md:w-64 p-1 rounded dark:bg-white/20 border dark:border-white/30 border-none"
          options={roleOptions}
          value={selectedRole}
          onChange={setSelectedRole}
        />
        <button
          type="submit"
          className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600 cursor-pointer"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto dark:bg-white/10 border-gray-500 bg-zinc-200 backdrop-blur-md rounded-lg">
        <table className="min-w-full text-left">
          <thead className="dark:bg-white/20 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-t dark:border-white/20 border-gray-400 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={setCurrentPage}
      ></Pagination>
    </div>
  );
};

export default ManageUsers;
