import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/loadingPage/LoadingSpinner";

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);
  const limit = 10;

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["applications", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications?page=${currentPage}&limit=${limit}`
      );
      setTotalApplications(res.data.total);
      return res.data.applications;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(totalApplications / limit);

  const handleDetails = (app) => {
    setDetails(app);
    setModal(true);
    console.log(app);
  };
  const handleAccept = async (app) => {
    // console.log(app)
    try {
      const res = await axiosSecure.patch(`/applications/${app._id}`, app);

      const { updateResult, deleteResult, guideResult } = res.data;
      console.log(updateResult, deleteResult, guideResult);

      if (
        updateResult.modifiedCount > 0 &&
        deleteResult.deletedCount > 0 &&
        guideResult.insertedId
      ) {
        Swal.fire({
          icon: "success",
          title: `${app.name} is now a Tour Guide!`,
          timer: 2000,
          toast: true,
          showConfirmButton: false,
        });
        refetch();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to accept the application!",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  };

  const handleReject = async (app) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to reject ${app.name}'s application.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(
          `/applications/delete?email=${app.email}`
        );
        if (res.data.deletedCount > 0) {
          Swal.fire({
            icon: "success",
            title: `${app?.name} has been rejected!`,
            timer: 2000,
            toast: true,
            showConfirmButton: false,
          });
          refetch();
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Something went wrong while rejecting.", "error");
      }
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="p-10 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-5 text-primary">
        Manage Candidates
      </h2>

      <div className="overflow-x-auto bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
        <table className="min-w-full text-left">
          <thead className="bg-white/20 text-white uppercase text-sm">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Current Role</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr
                  key={app._id}
                  className="border-t border-white/20 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{app?.name}</td>
                  <td className="px-4 py-3">{app.email}</td>
                  <td className="px-4 py-3 capitalize">tourist</td>
                  <td className="px-4 py-3 text-center space-x-3 font-semibold">
                    <button
                      onClick={() => handleAccept(app)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(app)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        handleDetails(app);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-white/70">
                  No pending applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-5">
        <div className="flex justify-center mt-6 gap-5 flex-wrap">
          {/* Prev Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page Numbers */}
          <div className="flex gap-4 rounded-md shadow-sm">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-1 text-sm font-medium rounded 
            ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="relative bg-white text-gray-900 rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-8 shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setModal(false);
                setDetails(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-3xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-primary">
              Applicant Details
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Title:</span>{" "}
                <span className="text-gray-800">{details?.title}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Name:</span>{" "}
                <span className="text-gray-800">{details?.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Email:</span>{" "}
                <span className="text-gray-800">{details?.email}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Phone:</span>{" "}
                <span className="text-gray-800">{details?.number}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Reason:</span>
                <p className="text-gray-800 mt-1">{details?.reason}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">CV Link:</span>{" "}
                <a
                  href={details?.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  View CV
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageCandidates;
