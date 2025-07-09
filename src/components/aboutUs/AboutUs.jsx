import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import developerImg from "../../assets/developer.webp";
const AboutUs = () => {
  return (
    <section className="min-h-screen  text-white py-30 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <h2 className="md:text-4xl text-2xl font-bold">About the Developer</h2>

        {/* Developer Profile */}
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white/10 border border-white/20 rounded-xl p-8 backdrop-blur-md shadow-xl">
          <img
            src={developerImg}
            alt="Developer"
            className="md:w-30 md:h-50 w-60 h-60 rounded-full object-cover border-4 border-white/30"
          />

          <div className="text-left space-y-4">
            <h3 className="text-2xl font-semibold">MD. Rashik</h3>
            <p className="text-white/80">
              I'm a passionate MERN Stack Developer with a love for crafting
              immersive and user-friendly web experiences. Travel BD is
              one of my full-stack projects that demonstrates authentication,
              database integration, smooth UI/UX, and real-time features.
            </p>
            <p className="text-white/70 text-sm">
              🌐 Location: Rangpur, Dhaka, Bangladesh <br />
              💻 Experience: 10+ projects completed <br />
              🎯 Tech Stack: React, Node.js, MongoDB, Express, Tailwind,
              Firebase, Stripe
            </p>

            {/* Social Links */}
            <div className="flex gap-4 text-xl mt-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://yourportfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition"
              >
                <FaGlobe />
              </a>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Featured Projects</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-white/90">
            <li className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition">
              <h4 className="font-semibold text-lg">StudyBond</h4>
              <p className="text-sm">
                A collaborative group study platform with task management and
                grading system.
              </p>
              <a
                href="https://studybond-client.web.app"
                target="_blank"
                className="text-teal-300 text-sm hover:underline mt-1 inline-block"
              >
                Live Site
              </a>
            </li>
            <li className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition">
              <h4 className="font-semibold text-lg">Tourify</h4>
              <p className="text-sm">
                A tour booking platform with real-time payment and role-based
                dashboards.
              </p>
              <a
                href="https://tourify-client.web.app"
                target="_blank"
                className="text-teal-300 text-sm hover:underline mt-1 inline-block"
              >
                Live Site
              </a>
            </li>
            {/* Add more if needed */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
