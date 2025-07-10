import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; 
import useAxiosSecure from "../hooks/useAxiosSecure";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading booking...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto mt-30">
      <Elements stripe={stripePromise}>
        <CheckoutForm booking={booking} />
      </Elements>
    </div>
  );
};

export default Payment;
