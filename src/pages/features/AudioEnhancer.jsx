import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGroq } from "../../hooks/useGroq"; // Import the custom Groq hook

const colors = {
  primary: "#dba20f", // Gold
  secondary: "#dba20f", // Yellow
  text: "black",
  bg: "linear-gradient(135deg, #222, #444)", // Dark theme
  border: "#FFD700",
};

const AudioEnhancer = () => {
  const { t } = useTranslation();
  const { fetchGroqResponse, response, loading, error } = useGroq(); // Use Groq hook
  const [contentType, setContentType] = useState("song_lyrics"); // Default content type
  const [prompt, setPrompt] = useState(""); // User input for content generation
  const [generatedContent, setGeneratedContent] = useState(null);

  const contentTypes = [
    { value: "song_lyrics", label: t("Song Lyrics") },
    { value: "podcast_script", label: t("Podcast Script") },
    { value: "audio_description", label: t("Audio Description") },
  ];

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      alert(t("Please enter a prompt to generate content."));
      return;
    }

    const taskPrompt = `Generate ${contentType.replace("_", " ")} based on the following input: ${prompt}`;
    await fetchGroqResponse("", taskPrompt); // Fetch response from Groq
  };

  // Update generated content when response changes
  useState(() => {
    if (response) {
      setGeneratedContent(response);
    }
  }, [response]);

  return (
    <div
      className="w-full bg-gray-300 min-h-screen px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center"
    >
      {/* Header Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-[74px] font-inkfree font-bold" style={{ color: "black" }}>
          {t("Content Labs")}
        </h1>
        <p className="text-xl mt-2" style={{ color: colors.text }}>
          {t("Create Audio Content with AI")}
        </p>
      </motion.div>

      {/* How to Use Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-8 rounded-xl border shadow-lg"
        style={{ borderColor: colors.border }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
          {t("How to Generate Content?")}
        </h2>
        <ul className="list-disc pl-5 space-y-2" style={{ color: colors.text }}>
          <li>{t("Select the type of content you want to generate.")}</li>
          <li>{t("Enter a prompt to guide the AI.")}</li>
          <li>{t("Click 'Generate Content' to create your text.")}</li>
          <li>{t("Review and download the generated content.")}</li>
        </ul>
      </motion.div>

      {/* Content Generator */}
      <div
        className="w-full max-w-3xl mt-8 p-8 rounded-xl border shadow-lg"
        style={{ borderColor: colors.border }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
          {t("AI Content Generator")}
        </h2>

        {/* Content Type Selector */}
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 mb-4"
          style={{ backgroundColor: "transparent", borderColor: colors.primary, color: colors.text }}
        >
          {contentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {/* Prompt Input */}
        <textarea
          placeholder={t("Enter your prompt here (e.g., 'A sad love song about rain')")}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 mb-4"
          style={{ backgroundColor: "transparent", borderColor: colors.primary, color: colors.text }}
          rows={4}
        />

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          onClick={handleGenerateContent}
          className="w-full mt-4 font-bold py-3 px-6 rounded-lg transition-all"
          style={{ backgroundColor: colors.primary, color: "#222" }}
          disabled={loading}
        >
          {loading ? t("Generating...") : t("Generate Content")}
        </motion.button>

        {/* Error Display */}
        {error && (
          <p className="mt-4 text-red-600" style={{ color: "red" }}>
            {t("Error:")} {error}
          </p>
        )}

        {/* Generated Content Output */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 rounded-lg border flex flex-col"
            style={{ borderColor: colors.border }}
          >
            <p className="mb-2" style={{ color: colors.text }}>
              {t("Your AI-generated content is ready!")}
            </p>
            <pre className="whitespace-pre-wrap" style={{ color: colors.text }}>
              {generatedContent}
            </pre>
            <button
              className="mt-4 py-2 px-4 rounded-lg font-semibold self-end"
              style={{ backgroundColor: colors.secondary, color: "#222" }}
              onClick={() => {
                const blob = new Blob([generatedContent], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${contentType}_${Date.now()}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              {t("Download Content")}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AudioEnhancer;