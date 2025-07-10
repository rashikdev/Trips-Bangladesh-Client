import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();

  console.log(booking);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { data } = await axiosSecure.post("/create-payment-intent", {
      price: booking.price,
    });

    const { clientSecret } = data;

    setProcessing(true);
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentMethod.error) {
      setError(paymentMethod.error.message);
      setProcessing(false);
      return;
    }

    const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.paymentMethod.id,
    });

    if (paymentIntent.error) {
      setError(paymentIntent.error.message);
      setProcessing(false);
    } else {
      if (paymentIntent.paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.paymentIntent.id);
        setError("");

        const paymentInfo = {
          bookingId: booking._id,
          transactionId: paymentIntent.paymentIntent.id,
          email: booking?.touristEmail,
          price: booking?.price,
          tourGuide: booking?.tourGuide,
          date: booking?.tourDate,
        };
        console.log(paymentInfo);

        await axiosSecure.post("/payments", paymentInfo);

        Swal.fire(
          "Payment Successful!",
          "Your booking is now in review.",
          "success"
        );
        navigate("/dashboard/myBookings");
      }
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">
        Payment for{" "}
        <span className="text-green-500">{booking.packageName}</span>
      </h2>
      <CardElement className="p-4 border rounded" />
      <div className="flex gap-5">
        <button
          className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : `Pay ${booking.price} BDT`}
        </button>
        <Link to="/dashboard/myBookings">
          <button className="bg-red-400 text-white px-4 py-1 rounded cursor-pointer">
            Cancel
          </button>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {transactionId && (
        <p className="font-semibold">
          Transaction ID:{" "}
          <span className="text-green-500">{transactionId}</span>
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
