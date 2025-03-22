import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Terms = () => {
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
        className="text-6xl font-inkfree  font-extrabold text-center mb-12"
        style={{ color: "black" }}
      >
        {t("Terms & Conditions")}
      </motion.h1>

      {/* Terms Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        {[
          {
            title: t("1. Acceptance of Terms"),
            description: t(
              "By using Audiolabs, you agree to comply with our terms and policies. Continued usage signifies your acceptance of these terms. We may update them periodically, so review them regularly. If you disagree, discontinue use immediately. Violation may result in account suspension."
            ),
          },
          {
            title: t("2. User Responsibilities"),
            description: t(
              "Users must upload and process audio responsibly. Misuse, including unauthorized AI-generated content distribution, is prohibited. Users should ensure they have rights to any uploaded content. Exploiting vulnerabilities or engaging in malicious activities is strictly forbidden."
            ),
          },
          {
            title: t("3. Intellectual Property & Ownership"),
            description: t(
              "Users retain full ownership of their generated audio. Audiolabs does not claim rights over user-created sound files. However, users grant Audiolabs a limited license to process their content. Unauthorized resale or redistribution of generated audio is not allowed."
            ),
          },
          {
            title: t("4. Service Limitations & Termination"),
            description: t(
              "Audiolabs reserves the right to modify or discontinue features at any time. Accounts engaging in unethical or illegal activities may be restricted or terminated. Users can request account closure, but past violations may lead to permanent bans."
            ),
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-xl bg-gray-800 shadow-lg hover:shadow-2xl transition-all text-center"
            style={{ color: colors.text }}
          >
            <h3 className="text-3xl font-bold mb-3" style={{ color: colors.primary }}>
              {item.title}
            </h3>
            <p className="text-lg">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Terms;
