import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const JoinAsTourGuide = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: userProfile = [], refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    if (!userProfile?.languages && !userProfile?.number) {
      return Swal.fire({
        icon: "warning",
        title: "Incomplete Profile!",
        text: "Please complete your profile before continuing.",
        confirmButtonText: "Update Now",
        confirmButtonColor: "orange",
        iconColor: "#facc15",
        customClass: {
          popup: "rounded-xl shadow-lg",
          confirmButton: "px-6 py-2",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    }
    data.applicantName = user?.displayName;
    data.applicantEmail = user?.email;
    data.status = "pending";

    axiosSecure
      .post("/applications", data)
      .then((res) => {
        if (res.data.insertedId) {
          console.log(res.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your application has been submitted",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
    console.log(data);
    reset();
  };

  const { data: application = {}, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {application?.status !== "pending" ? (
        <div className="min-h-screen py-16 px-6 md:px-12 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
          <div className="max-w-3xl mx-auto bg-white/10 border border-white/20 p-8 rounded-xl shadow-xl backdrop-blur-md">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Join as Tour Guide
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Application Title */}
              <div>
                <label className="block mb-1">Application Title</label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter a title for your application"
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                {errors.title && (
                  <p className="text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>

              {/* Reason */}
              <div>
                <label className="block mb-1">
                  Why do you want to be a Tour Guide?
                </label>
                <textarea
                  {...register("reason", {
                    required: "Please explain your motivation",
                  })}
                  rows="4"
                  placeholder="Share your reason..."
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
                ></textarea>
                {errors.reason && (
                  <p className="text-sm text-red-400">
                    {errors.reason.message}
                  </p>
                )}
              </div>

              {/* CV Link */}
              <div>
                <label className="block mb-1">CV Link</label>
                <input
                  type="url"
                  {...register("cvLink", {
                    required: "CV link is required",
                    pattern: {
                      value: /^(http|https):\/\/[^ "]+$/,
                      message: "Enter a valid URL",
                    },
                  })}
                  placeholder="Paste your CV drive or web link"
                  className="w-full px-4 py-2 rounded-md bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                {errors.cvLink && (
                  <p className="text-sm text-red-400">
                    {errors.cvLink.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 transition text-white py-2 px-4 rounded-md cursor-pointer"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-lg text-center animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-2">
              Application Already Submitted
            </h2>
            <p className="text-white/80 text-base">
              You have already submitted an application. We will get back to you
              soon!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinAsTourGuide;
