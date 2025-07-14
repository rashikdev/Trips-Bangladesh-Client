import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(payments);

  if (isLoading) return "Loading...";

  return (
    <section className="md:px-10 text-white px-3">
      <h2 className="text-3xl font-bold mb-8 text-orange-400">
        Payment History
      </h2>

      <div className="overflow-x-auto shadow-md rounded-xl border border-white/20 bg-white/5 backdrop-blur">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-white uppercase text-xs">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Email</th>
              <th className="p-4">Price</th>
              <th className="p-4">Tour Guide</th>
              <th className="p-4">Tour Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr
                key={payment._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-4">{idx + 1}</td>
                <td className="p-4">{payment.transactionId}</td>
                <td className="p-4">{payment.email}</td>
                <td className="p-4 font-semibold text-orange-400">
                  {payment.price} BDT
                </td>
                <td className="p-4">
                  {payment.tourGuide?.name}
                  <br />
                  <span className="text-xs text-gray-400">
                    {payment.tourGuide?.email}
                  </span>
                </td>
                <td className="p-4">
                  {new Date(payment.date).toLocaleDateString("en-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PaymentHistory;
