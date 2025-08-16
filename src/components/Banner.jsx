import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState, useRef } from "react";
import bannerBg from "../assets/bannerBg.jpg";
import { Link } from "react-router";
const Banner = () => {
  const [showMainBanner, setShowMainBanner] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const bannerRef = useRef();

  useEffect(() => {
    const visited = localStorage.getItem("hasVisitedTrips");
    if (!visited) {
      setShowAnimation(true);
    } else {
      setShowMainBanner(true);
    }
  }, []);

  useGSAP(() => {
    if (!showAnimation) return;

    const tl = gsap.timeline({
      onComplete: () => {
        localStorage.setItem("hasVisitedTrips", "true");
        setShowMainBanner(true);
      },
    });

    // Slide-in intro
    tl.from("#intro", {
      x: "-100%",
      duration: 1,
      delay: 0.5,
    });

    // Show text one by one
    tl.from(".title", {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      stagger: 0.3,
    });

    // Hide text one by one
    tl.to(".title", {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      stagger: 0.2,
    });

    // Slide-out intro
    tl.to("#intro", {
      x: "100%",
      duration: 1,
      delay: 0.2,
    });

    // Fade in welcome
    tl.from("#welcome", {
      opacity: 0,
      duration: 0.5,
    });

    // Fade out parent
    tl.to("#parent", {
      opacity: 0.8,
      duration: 1,
    });
  }, [showAnimation]);

  // Animate main banner text with stagger after intro is done
  useGSAP(() => {
    if (!showMainBanner) return;

    gsap.from(".banner-item", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, [showMainBanner]);

  return (
    <section className="relative h-[100vh] overflow-hidden">
      {/* Animation Sequence (only once) */}
      {showAnimation && !showMainBanner && (
        <div id="parent">
          {/* Intro Slide with Gradient Theme */}
          <div
            id="intro"
            className="h-screen absolute top-0 left-0 z-10 w-full flex flex-col gap-10 tracking-tight p-10 justify-center items-center text-white"
          >
            <h2 className="text-5xl md:text-8xl font-bold title">
              Adventure Awaits
            </h2>
            <h2 className="text-4xl md:text-7xl font-bold title">
              Discover Bangladesh
            </h2>
            <h2 className="text-3xl md:text-6xl font-bold title">
              Plan Your Journey Today
            </h2>
          </div>

          <div
            className="h-screen flex items-center justify-center text-white bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerBg})` }}
          >
            <h2 id="welcome" className="text-7xl md:text-9xl font-bold">
              Welcome
            </h2>
          </div>
        </div>
      )}

      {/* Final Banner */}
      {showMainBanner && (
        <div
          ref={bannerRef}
          className="absolute inset-0 bg-cover bg-center flex items-center justify-center px-4"
          style={{ backgroundImage: `url(${bannerBg})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10 z-0"></div>

          {/* Main Content */}
          <div className="relative z-10 text-center text-white max-w-2xl backdrop-blur-md bg-white/10 p-6 rounded-lg border border-white/30">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow banner-item">
              Explore the Beauty of Bangladesh
            </h1>
            <p className="text-lg md:text-xl mb-6 banner-item px-7">
              Discover iconic landmarks, hidden gems, rich culture, and vibrant
              local life.
            </p>
            <Link to="/trips">
              <button className="bg-white text-black font-semibold px-6 py-2 rounded shadow hover:bg-primary hover:text-white banner-item cursor-pointer">
                Start Your Journey
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Banner;
