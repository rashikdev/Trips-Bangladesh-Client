import React from "react";
import { FaQuestionCircle } from "react-icons/fa"; // React Icon
import question from "../../assets/Question.png";
import { motion } from "motion/react";

const FaqSection = () => {
  const questions = [
    {
      q: "What is Trips?",
      a: "Trips is your companion for exploring Bangladesh — find tourist attractions, book packages, and connect with tour guides all in one place.",
    },
    {
      q: "How do I book a tour package?",
      a: "Simply browse our packages, click 'View Details', and book from there after logging in to your account.",
    },
    {
      q: "Can I cancel a booking?",
      a: "You can cancel a booking if its status is still 'Pending'. Paid bookings are subject to our cancellation policy.",
    },
    {
      q: "How do I become a tour guide?",
      a: "Go to your profile and click on 'Apply for Tour Guide'. Fill out the application form and wait for admin approval.",
    },
  ];

  return (
    <section className="mt-8 md:mt-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto py-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="hidden md:block w-1/2"
          >
            <img
              src={question}
              alt="FAQ Illustration"
              className="w-full h-full rounded-2xl border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>

          {/* Right FAQ content */}
          <div className="w-full md:w-1/2 space-y-5">
            {questions.map((item, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className="collapse collapse-arrow backdrop-blur rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-orange-400"
              >
                <input type="checkbox" />
                <div className="collapse-title flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-orange-500">
                  <FaQuestionCircle className="w-5 h-5 text-orange-400" />
                  {item.q}
                </div>
                <div className="collapse-content text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-3">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
