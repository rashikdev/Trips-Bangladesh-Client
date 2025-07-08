import React from "react";

const ContactUsSection = () => {
  return (
    <section className="py-16 px-4 md:px-10 bg-gradient-to-b from-[#0d1b2a] to-[#1b263b] text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10 ">
          {/* Contact Info */}
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">Still have questions?</h2>
            <p className="text-white/80">
              need help with your booking, or just want to say
              hi? We’re always happy to hear from you!
            </p>
            <div>
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-white/70">support@bdtravelguide.com</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Phone</h4>
              <p className="text-white/70">+880 1234 567 890</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Address</h4>
              <p className="text-white/70">
                123 Travel Street, Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 shadow-lg space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 rounded bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition"
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
