import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const colors = {
  primary: "#fde047", // Yellow for title
  text: "black",
  background: "#0a0a0a",
};

// Variants for animations
const fadeInVariant = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -150 : 150 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
});

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen mb-24 bg-gray-300 mt-24 flex flex-col items-center justify-start px-6 md:px-12 pt-12 overflow-hidden">
      {/* About Us Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-extrabold font-inkfree text-center w-full mb-10"
        style={{ color: colors.text }}
      >
        {t("About Us")}
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl max-w-5xl text-center md:text-left mb-12 leading-relaxed px-4 md:px-0"
        style={{ color: colors.text }}
      >
        {t(
          "AudioLabs – Mix and Fix, Lyrical Kicks! Our AI-powered platform transforms the way you create and enhance audio. Whether it's text-to-audio, audio-to-text, AI-generated sounds, or audio enhancement, we make sound smarter and more immersive."
        )}
      </motion.p>

      {/* Features Section */}
      <div className="space-y-10 w-full max-w-5xl">
        {[
          {
            title: "Text to Audio",
            description:
              "Convert your written words into realistic, high-quality voiceovers in seconds.",
          },
          {
            title: "Audio to Text",
            description:
              "Transcribe spoken words into text with high accuracy and AI-powered efficiency.",
          },
          {
            title: "AI Audio Generation",
            description:
              "Create unique AI-generated sounds, effects, and voices for various applications.",
          },
          {
            title: "Audio Enhancement",
            description:
              "Improve clarity, reduce noise, and enhance overall audio quality effortlessly.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeInVariant(index % 2 === 0 ? "left" : "right")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="p-6 md:p-8 rounded-xl bg-gray-700 shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.03]"
            style={{ color: "white" }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: colors.primary }}
            >
              {t(feature.title)}
            </h3>
            <p className="text-lg text-gray-300">{t(feature.description)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
