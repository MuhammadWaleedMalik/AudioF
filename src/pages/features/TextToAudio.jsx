// AudioPage.js
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useAudio from "../../hooks/useAudio"; // Adjust path as needed

const primaryColor = "#fde047"; // Yellow
const textColor = "#ffffff"; // White
const secondaryColor = "#dba20f"; // Darker Yellow/Gold

const TextToAudio = () => {
  const { t } = useTranslation();
  const { audioData, isLoading, error, generateAudio } = useAudio();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      generateAudio(text);
    }
  };

  const handleDownload = () => {
    if (audioData) {
      const url = URL.createObjectURL(audioData);
      const link = document.createElement("a");
      link.href = url;
      link.download = "output.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-300 flex flex-col justify-center px-20">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold font-inkfree mb-10 uppercase"
        style={{ color: "black" }}
      >
        {t("generateAudio")}
      </motion.h1>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-red-500/50 text-white px-6 py-3 rounded-lg mb-6 text-lg"
        >
          {error}
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col">
          <label className="text-3xl font-semibold" style={{ color: secondaryColor }}>
            {t("textToConvert")}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-2/3 p-4 border-b-2 border-gray-500 bg-transparent text-black text-xl focus:outline-none focus:border-yellow-400 resize-none"
            rows="4"
            placeholder={t("enterTextHere")}
            disabled={isLoading}
            required
          />
        </div>

        {/* Generate Button */}
        <motion.button
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          type="submit"
          disabled={isLoading}
          className="p-5 text-xl font-bold rounded-lg hover:opacity-80 transition-all duration-300 uppercase"
          style={{
            backgroundColor: primaryColor,
            color: textColor,
            width: "50%",
          }}
        >
          {isLoading ? t("generating") : t("generateAudio")}
        </motion.button>
      </form>

      {/* Audio Player and Download */}
      {audioData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex flex-col items-center"
        >
          <audio controls className="w-2/3 mb-4">
            <source src={URL.createObjectURL(audioData)} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <button
            onClick={handleDownload}
            className="p-4 font-bold text-xl rounded-lg hover:opacity-80 transition-all duration-300 uppercase"
            style={{
              backgroundColor: secondaryColor,
              color: textColor,
            }}
          >
            {t("download")}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TextToAudio;