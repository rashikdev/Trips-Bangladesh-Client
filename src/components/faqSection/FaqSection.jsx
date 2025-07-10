import React from "react";

const FaqSection = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-gradient-to-b from-[#1b263b] to-[#0d1b2a] text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div className="collapse collapse-arrow bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              What is Trips?
            </div>
            <div className="collapse-content text-white/80">
              <p>
                Trips is your companion for exploring Bangladesh —
                find tourist attractions, book packages, and connect with tour
                guides all in one place.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              How do I book a tour package?
            </div>
            <div className="collapse-content text-white/80">
              <p>
                Simply browse our packages, click "View Details", and book from
                there after logging in to your account.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              Can I cancel a booking?
            </div>
            <div className="collapse-content text-white/80">
              <p>
                You can cancel a booking if its status is still "Pending". Paid
                bookings are subject to our cancellation policy.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">
              How do I become a tour guide?
            </div>
            <div className="collapse-content text-white/80">
              <p>
                Go to your profile and click on “Apply for Tour Guide”. Fill out
                the application form and wait for admin approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
