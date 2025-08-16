import React from "react";
import question from "../../assets/Question.gif";
const FaqSection = () => {
  return (
    <section className="mt-8 md:mt-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto py-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="hidden md:block">
            <img
              src={question}
              alt="FAQ Illustration"
              className="w-full h-full rounded-xl shadow-lg"
            />
          </div>

          {/* Right FAQ content */}
          <div className="">
            <div className="space-y-4">
              {/* Q1 */}
              <div className="collapse collapse-arrow  backdrop-blur border-b-2 border-gray-700 rounded-xl">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold">
                  What is Trips?
                </div>
                <div className="collapse-content text-gray-400">
                  <p>
                    Trips is your companion for exploring Bangladesh — find
                    tourist attractions, book packages, and connect with tour
                    guides all in one place.
                  </p>
                </div>
              </div>

              {/* Q2 */}
              <div className="collapse collapse-arrow  backdrop-blur border-b-2 border-gray-700 rounded-xl">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold">
                  How do I book a tour package?
                </div>
                <div className="collapse-content text-gray-400">
                  <p>
                    Simply browse our packages, click "View Details", and book
                    from there after logging in to your account.
                  </p>
                </div>
              </div>

              {/* Q3 */}
              <div className="collapse collapse-arrow  backdrop-blur border-b-2 border-gray-700 rounded-xl">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold">
                  Can I cancel a booking?
                </div>
                <div className="collapse-content text-gray-400">
                  <p>
                    You can cancel a booking if its status is still "Pending".
                    Paid bookings are subject to our cancellation policy.
                  </p>
                </div>
              </div>

              {/* Q4 */}
              <div className="collapse collapse-arrow  backdrop-blur border-b-2 border-gray-700 rounded-xl">
                <input type="checkbox" />
                <div className="collapse-title text-lg font-semibold">
                  How do I become a tour guide?
                </div>
                <div className="collapse-content text-gray-400">
                  <p>
                    Go to your profile and click on “Apply for Tour Guide”. Fill
                    out the application form and wait for admin approval.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Left Image */}
      </div>
    </section>
  );
};

export default FaqSection;
