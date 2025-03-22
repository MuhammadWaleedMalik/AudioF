import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaRobot } from "react-icons/fa";
import { GiCircuitry } from "react-icons/gi"; // New robotic icon

const NotFound = () => {
  const { t } = useTranslation();

  const colors = {
    primary: "#fde047", // Yellow
    secondary: "#ffba08", // Golden Yellow
    text: "white",
    bg: "black",
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center bg-black p-10 rounded-2xl shadow-xl border-4"
        style={{
          borderColor: colors.secondary,
        }}
      >
        {/* 404 Text with Circuit Effect */}
        <div className="relative">
          <h1 className="text-9xl font-extrabold" style={{ color: colors.primary }}>
            404
          </h1>
          <GiCircuitry className="absolute top-0 right-0 text-7xl text-gray-700 opacity-50" />
          <GiCircuitry className="absolute bottom-0 left-0 text-7xl text-gray-700 opacity-50 rotate-180" />
        </div>

        {/* Robot Head Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-6 text-8xl text-yellow-500"
        >
          <FaRobot />
        </motion.div>

        {/* Message */}
        <h2 className="mt-6 text-4xl font-bold" style={{ color: colors.primary }}>
          {t("Page Not Found")}
        </h2>
        <p className="mt-2 text-lg text-gray-400">
          {t("Oops! The system couldn't locate this page.")}
        </p>

        {/* Glowing Button */}
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <Link
            to="/"
            className="mt-6 inline-block px-8 py-3 text-lg font-semibold rounded-full transition-all"
            style={{
              backgroundColor: colors.secondary,
              color: "black",
              boxShadow: "0px 0px 20px rgba(255, 186, 8, 0.8)",
            }}
          >
            {t("Return to Base")}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
