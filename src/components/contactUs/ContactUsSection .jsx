import React from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUsSection = () => {
  return (
    <section className="px-4 mt-8 md:mt-16 md:px-10 dark:text-white/80 text-black/70">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">
              Still have questions?
            </h3>
            <p className="">
              Need help with your booking, or just want to say hi? We’re always
              happy to hear from you!
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <div>
                  <h4 className="font-semibold ">Email</h4>
                  <p className="text-gray-400">support@bdtravelguide.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-400">+880 1234 567 890</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" />
                <div>
                  <h4 className="font-semibold ">Address</h4>
                  <p className="text-gray-400">
                    123 Travel Street, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-gray-300 dark:border-white/20 shadow-lg space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Message sent successfully!");
              e.target.reset();
            }}
          >
            <div>
              <label className="block text-sm mb-1 font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded dark:bg-white/20 bg-gray-300 dark:text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded dark:bg-white/20 bg-gray-300 dark:text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 rounded dark:bg-white/20 bg-gray-300 dark:text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-orange-500 text-white font-semibold py-2 rounded-md transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
