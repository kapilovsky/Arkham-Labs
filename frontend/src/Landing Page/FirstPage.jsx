import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import bg from "../assets/images/4.webp";
import ParallaxStickers from "../components/ParallaxStickers";
import { LandingPageNavbar } from "../components/LandingPageNavbar";
import { Link } from "react-router-dom";

export const FirstPage = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  // Animation variants
  const imageVariants = {
    hidden: { scale: 1.1, opacity: 1 },
    visible: { scale: 1, opacity: 1 },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const trustTextVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 0.8,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const subheadingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.9,
        ease: "easeOut",
      },
    },

    hover: {
      boxShadow:
        "inset 0 0 30px rgb(0, 0, 0), 0px 10px 10px rgba(0, 0, 0, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },

    tap: {
      scale: 0.98,
    },
  };

  return (
    <motion.div
      id="home"
      initial={{ backgroundColor: "#000" }}
      animate={{ backgroundColor: "#f9f9f9" }}
      transition={{ duration: 1.5, ease: "anticipate", type: "tween" }}
      className="first-page min-h-screen w-full relative"
      ref={sectionRef}
    >
      <div className="banner neue-med">
        <ion-icon name="warning-sharp"></ion-icon>{" "}
        <p>
          {" "}
          Backend is down right now, but you can still see Arkham Labs in
          action!{" "}
          <a
            href="https://youtu.be/Rczr7Lizdy0?si=FhI8gm7j-HaZByIN"
            target="_blank"
            rel="noopener noreferrer"
            className="banner-link"
          >
            Watch the video demo
          </a>
        </p>
      </div>
      <LandingPageNavbar />

      <div className="flex flex-col justify-center items-center absolute z-[1] w-full ">
        <div className="h-[88vh] w-[98vw] relative overflow-hidden rounded-4xl">
          <motion.img
            src={bg}
            className="h-full w-full object-cover bg"
            alt="Arkham background"
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ duration: 1.5 }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          <ParallaxStickers />
        </div>
        <div className="z-[2] absolute sm:top-0 top-24 left-0 w-full h-screen flex flex-col sm:justify-center items-center">
          <motion.div
            className="flex items-center justify-center gap-2 text-white px-3 py-1 rounded-full uppercase batman-badge mb-4"
            variants={badgeVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="dot"></div>Early Access
          </motion.div>

          <motion.p
            className="text-sm text-white mb-4 tracking-wide neue-reg"
            variants={trustTextVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Trusted by developers from top tech companies
          </motion.p>

          <motion.h1
            className="text-lg sm:text-2xl font-bold text-center hero-text text-white"
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Welcome to <br />
            <span className="sm:text-7xl text-5xl">ARKHAM LABS</span>
          </motion.h1>

          <motion.p
            className="subhero-text text-xl text-center text-[#f9f9f9] mt-4"
            variants={subheadingVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            Where <span className="italic">elite</span> minds sharpen <br />{" "}
            their <span className="italic">coding powers.</span>
          </motion.p>

          <motion.button
            className="mt-10 get-started-btn"
            variants={buttonVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileTap="tap"
            whileHover="hover"
          >
            <Link to="/sign-up">
              <span>✦</span> &nbsp; Get Started
            </Link>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
