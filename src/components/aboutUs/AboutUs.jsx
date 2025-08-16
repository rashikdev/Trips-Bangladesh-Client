import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import developerImg from "../../assets/developer.webp";

const projects = [
  {
    name: "STUDY BOND",
    thumbnail: "https://i.postimg.cc/ZKXyDfx4/image.png",
    description:
      "StudyBond is a group study platform where users can create groups, assign tasks, submit work, and manage learning collaboratively.",
    features: [
      "Group creation & joining: Easily create or join study groups based on your subjects or topics, fostering collaborative learning.",
      "Task assignment & submission: Manage your assignments effectively by creating tasks, assigning them to group members, and tracking submissions.",
      "User dashboard & profile management: Each user has a personalized dashboard to manage their tasks, view progress, and modify profile settings.",
      "JWT-based authentication & authorization: Ensure secure access to the platform with industry-standard JSON Web Tokens for user authentication and authorization.",
    ],
    liveSite: "https://study-bond-bd1de.web.app/",
    gitHubClient: "https://github.com/rashikdev/StudyBond",
    gitHubServer: "https://github.com/rashikdev/STUDY-BOND_Server",
  },
  {
    name: "HOBBY HUB",
    thumbnail: "https://i.postimg.cc/NFbprJfd/image.png",
    description:
      "HobbyHub is a creative community platform where users can share, join, and explore hobby groups with seamless user experience.",
    features: [
      "User dashboards: Each user has access to a personalized dashboard that showcases their bookings, preferences, and recommended tours.",
      "Group/category management: Organize tours into various categories and allow users to manage their groups seamlessly.",
      "Responsive dark & light mode UI: Enhance user experience with a fully responsive design that supports both dark and light modes for better visibility.",
      "Dynamic filtering & search functionality: Empower users with advanced search options and dynamic filters to find tours that suit their interests quickly.",
    ],
    liveSite: "https://hobby-hub-a8201.web.app/",
    gitHubClient: "https://github.com/rashikdev/HobbyHub?tab=readme-ov-file",
    gitHubServer: "https://github.com/rashikdev/hobbyhub-server",
  },
];
const AboutUs = () => {
  return (
    <section className="min-h-screen pt-30 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <h2 className="md:text-4xl text-2xl text-center font-bold text-primary">
          About the Developer
        </h2>

        {/* Developer Profile */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 bg-white/10 border border-white/20 rounded-xl shadow-xl group py-10">
          <div className="flex-1 flex justify-center">
            <img
              src={developerImg}
              alt="Developer"
              className="md:w-30 md:h-50 w-60 h-60 rounded-full object-cover border-4 dark:border-white/30 border-zinc-400 group-hover:border-orange-400"
            />
          </div>

          <div className="text-left space-y-4 flex-3 p-4 md:p-0">
            <h3 className="text-2xl font-semibold">MD. Rashik</h3>
            <p className="dark:text-white/80 text-zinc-600">
              I'm a passionate MERN Stack Developer with a love for crafting
              immersive and user-friendly web experiences. Trips is one of
              my full-stack projects that demonstrates authentication, database
              integration, smooth UI/UX, and real-time features.
            </p>
            <p className="dark:text-white/70 text-zinc-600 text-sm">
              🌐 Location: Rangpur, Dhaka, Bangladesh <br />
              💻 Experience: 10+ projects completed <br />
              🎯 Tech Stack: React, Node.js, MongoDB, Express, Tailwind,
              Firebase, Stripe
            </p>

            {/* Social Links */}
            <div className="flex gap-4 text-xl mt-4">
              <a
                href="https://github.com/rashikdev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/rashikdev"
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
        <div className="py-16">
          <div className="">
            <h3 className="text-3xl font-bold text-center mb-12 text-primary">
              Featured Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white/10 border border-white/10 p-6 rounded-xl shadow-md backdrop-blur-md hover:scale-[1.02] transition"
                >
                  <h4 className="text-xl font-semibold mb-4">{project.name}</h4>

                  {/* Image */}
                  <div className="mb-6 h-60 rounded-lg overflow-hidden border dark:border-white/10 border-zinc-300">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Features */}
                  <ul className="mb-6 list-disc list-inside dark:text-white/80 text-zinc-600 space-y-1">
                    {project.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>

                  {/* Links */}
                  <div className="flex gap-4 flex-wrap mt-4">
                    <a
                      href={project.liveSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition"
                    >
                      <FaGlobe /> Live Site
                    </a>

                    <a
                      href={project.gitHubClient}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
                    >
                      <FaGithub /> GitHub Client
                    </a>

                    {project.gitHubServer && (
                      <a
                        href={project.gitHubServer}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
                      >
                        <FaGithub /> GitHub Server
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
