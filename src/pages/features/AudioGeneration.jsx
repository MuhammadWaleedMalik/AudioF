// AudioPage.js
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import useAudio from "../../hooks/useAudio"; // Adjust path as needed

const primaryColor = "#fde047"; // Yellow
const textColor = "#ffffff"; // White
const secondaryColor = "#dba20f"; // Darker Yellow/Gold

const AudioGeneration = () => {
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
    <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center items-center px-10 py-12">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold font-inkfree mb-6 uppercase text-gray-900 text-center"
      >
        {t("generateAudio")}
      </motion.h1>

      {/* Step-by-step Guide */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-3/4 bg-white p-6 shadow-lg rounded-lg text-lg text-gray-700 mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">How to Generate and Download Audio:</h2>
        <ul className="list-decimal list-inside space-y-3">
          <li>Enter your text in the box below.</li>
          <li>Click the <span className="font-semibold text-yellow-600">"Generate Audio"</span> button.</li>
          <li>Wait for the audio to be processed.</li>
          <li>Once ready, you can play the audio or download it by clicking the <span className="font-semibold text-yellow-600">"Download"</span> button.</li>
        </ul>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-red-500 text-white px-6 py-3 rounded-lg mb-6 text-lg"
        >
          {error}
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 w-3/4">
        <div className="flex flex-col">
          <label className="text-2xl font-semibold mb-2" style={{ color: secondaryColor }}>
            {t("textToConvert")}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border-2 border-gray-400 rounded-lg bg-white text-gray-900 text-lg focus:outline-none focus:border-yellow-500 resize-none shadow-sm"
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
          className="w-full p-4 text-xl font-bold rounded-lg hover:opacity-80 transition-all duration-300 uppercase shadow-md"
          style={{
            backgroundColor: primaryColor,
            color: textColor,
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
          className="mt-10 w-3/4 flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
        >
          <audio controls className="w-full mb-4">
            <source src={URL.createObjectURL(audioData)} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <button
            onClick={handleDownload}
            className="w-full p-4 font-bold text-xl rounded-lg hover:opacity-80 transition-all duration-300 uppercase shadow-md"
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

export default AudioGeneration;
