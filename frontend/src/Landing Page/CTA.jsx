import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import bg from "../assets/images/arkham11.png";
import "../styles/CTA.css";
import { Link } from "react-router-dom";

export const CTA = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.6,
      },
    },
    hover: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 8,
      },
    },
    tap: { scale: 0.98 },
  };

  return (
    <div id="cta" className="min-h-[90vh] p-4" ref={sectionRef}>
      <div className="relative min-h-[90vh] rounded-4xl overflow-hidden flex items-center justify-center">
        {/* Background with animation */}
        <motion.img
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0.8 }
          }
          transition={{ duration: 2 }}
          src={bg}
          className="absolute w-full h-full object-cover bg"
          alt="Arkham background"
          loading="eager"
        />

        {/* Content Layer */}
        <div className="relative cta-box z-10 h-full w-full ">
          <motion.div
            className="text-center max-w-4xl mx-auto px-4 flex flex-col items-center justify-center h-full"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2
              className="sm:text-6xl text-4xl neue-med text-white mb-4"
              variants={itemVariants}
            >
              Ready to <span className="italic">Embrace</span> the Night?
            </motion.h2>

            <motion.p
              className="sm:text-xl text-lg neue-med text-[#ffffff]/70 mb-8"
              variants={itemVariants}
            >
              Behind every great coder is a darker chapter of quiet practice.{" "}
              <br />
              Start yours — inside Arkham Labs.
            </motion.p>

            <motion.div className="cta-buttons" variants={itemVariants}>
              <motion.button
                className="cta-button primary-button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link to="sign-up"> ✦&nbsp; Start Training</Link>
              </motion.button>

              <motion.button
                className="cta-button secondary-button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://youtu.be/Rczr7Lizdy0?si=FhI8gm7j-HaZByIN"
                >
                  Watch Demo
                </a>
              </motion.button>
            </motion.div>

            <motion.p
              className="neue-reg text-sm text-[#f1f1f1]/60 "
              variants={itemVariants}
            >
              No credit card required. Cancel anytime.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
