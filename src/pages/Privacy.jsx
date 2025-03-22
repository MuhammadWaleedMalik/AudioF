import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation();

  const colors = {
    primary: "#fde047", // Yellow
 
    text: "white",
    background: "black",
  };

  return (
    <div className="min-h-screen bg-gray-300 mt-24 flex flex-col items-center justify-center px-8 py-16">
      {/* Title Centered */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-6xl font-inkfree font-extrabold text-center mb-12"
        style={{ color: "black" }}
      >
        {t("Privacy Policy")}
      </motion.h1>

      {/* Privacy Sections (Centered in a Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        {[
          {
            title: t("🎙️ Audio Data Collection"),
            content: t(
              "Audiolabs processes user-provided audio files and text inputs solely to generate and enhance audio content. We do not store or share user audio without explicit consent."
            ),
          },
          {
            title: t("🔐 Secure Processing"),
            content: t(
              "All text-to-audio, audio-to-text, and enhancement processes occur through encrypted channels, ensuring your data remains private and protected."
            ),
          },
          {
            title: t("🎛 AI Processing & Improvement"),
            content: t(
              "We use anonymized data to refine our AI models for better audio generation and enhancement. Users can opt out of data usage for AI training."
            ),
          },
          {
            title: t("📂 User Control & Data Deletion"),
            content: t(
              "Users have full control over their generated audio and can delete any processed files. No personal data is retained beyond the necessary processing period."
            ),
          },
          {
            title: t("🎵 Copyright & Ownership"),
            content: t(
              "Users retain full ownership of their generated audio. Audiolabs does not claim rights over user-created sound files and does not distribute them without permission."
            ),
          },
          {
            title: t("⚙️ Third-Party Integrations"),
            content: t(
              "We integrate trusted third-party AI tools for enhanced processing. These services comply with strict privacy policies and do not access user data beyond necessary processing."
            ),
          },
          {
            title: t("📅 Policy Updates"),
            content: t(
              "We may update our privacy policy to reflect improvements in security and service. Users will be notified of significant changes."
            ),
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-gray-800 shadow-lg hover:shadow-2xl transition-all text-center"
            style={{ color: colors.text }}
          >
            <h2 className="text-3xl font-bold mb-3" style={{ color: colors.primary }}>
              {section.title}
            </h2>
            <p className="text-lg">{section.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-8 text-center">
        <p className="text-lg text-white">
          {t("Need more info? Contact us at")}{" "}
          <span className="font-semibold" style={{ color: colors.primary }}>
            support@audiolabs.com
          </span>
        </p>
      </div>
    </div>
  );
};

export default Privacy;
