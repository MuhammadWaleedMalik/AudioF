import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import useAudio2Text from "../../hooks/useAudio2Text";

const colors = {
  primary: "#dba20f",
  secondary: "#dba20f",
  text: "black",
  border: "#FFD700",
};

const MusicGenerator = () => {
  const { t } = useTranslation();
  const { uploadAudio, generateMusic, voiceId, instrumentalId, generatedAudio, isLoading, error } = useAudio2Text();
  const [audioFile, setAudioFile] = useState(null);
  const [purpose, setPurpose] = useState("song");
  const [lyrics, setLyrics] = useState("##Under the endless sky so wide   \n\nDreams begin to fly   The moonlight touches the soul   \n\nGentle thoughts arise   In this peaceful night   \n\nWe sing with hearts so free##");

  const handleUpload = () => {
    if (audioFile) {
      uploadAudio(audioFile, purpose);
    }
  };

  const handleGenerate = () => {
    if (lyrics) {
      generateMusic(lyrics);
    }
  };

  const handleDownload = () => {
    if (generatedAudio) {
      const a = document.createElement("a");
      a.href = generatedAudio;
      a.download = `generated_music_${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="w-full bg-gray-300 min-h-screen px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-[74px] font-inkfree font-bold" style={{ color: "black" }}>
          {t("Music Labs")}
        </h1>
        <p className="text-xl mt-2" style={{ color: colors.text }}>
          {t("Create AI Music from Audio")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-8 rounded-xl border shadow-lg mb-8"
        style={{ borderColor: colors.border }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
          {t("How to Generate Music?")}
        </h2>
        <ul className="list-disc pl-5 space-y-2" style={{ color: colors.text }}>
          <li>{t("Upload an audio file (10s to 10min, WAV/MP3).")}</li>
          <li>{t("Choose purpose: song, voice, or instrumental.")}</li>
          <li>{t("Enter lyrics and generate AI music.")}</li>
          <li>{t("Listen and download the generated audio.")}</li>
        </ul>
      </motion.div>

      <div className="w-full max-w-3xl p-8 rounded-xl border shadow-lg" style={{ borderColor: colors.border }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
          {t("AI Music Generator")}
        </h2>

        <input
          type="file"
          accept="audio/wav,audio/mp3"
          className="w-full p-3 rounded-lg border mb-4"
          style={{ borderColor: colors.primary, color: colors.text }}
          onChange={(e) => setAudioFile(e.target.files[0])}
        />

        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="w-full p-3 rounded-lg border mb-4"
          style={{ borderColor: colors.primary, color: colors.text }}
        >
          <option value="song">{t("Song (Vocals + Instrumental)")}</option>
          <option value="voice">{t("Voice Only")}</option>
          <option value="instrumental">{t("Instrumental Only")}</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleUpload}
          className="w-full py-3 px-6 rounded-lg mb-4"
          style={{ backgroundColor: colors.primary, color: "#222" }}
          disabled={isLoading || !audioFile}
        >
          {isLoading ? t("Uploading...") : t("Upload Audio")}
        </motion.button>

        {(voiceId || instrumentalId) && (
          <div className="mb-4" style={{ color: colors.text }}>
            {voiceId && <p>{t("Voice ID:")} {voiceId}</p>}
            {instrumentalId && <p>{t("Instrumental ID:")} {instrumentalId}</p>}
          </div>
        )}

        <textarea
          placeholder={t("Enter your lyrics here...")}
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          className="w-full p-3 rounded-lg border mb-4"
          style={{ borderColor: colors.primary, color: colors.text }}
          rows={4}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleGenerate}
          className="w-full py-3 px-6 rounded-lg mb-4"
          style={{ backgroundColor: colors.primary, color: "#222" }}
          disabled={isLoading || (!voiceId && !instrumentalId) || !lyrics}
        >
          {isLoading ? t("Generating...") : t("Generate Music")}
        </motion.button>

        {error && <p className="text-red-600 mb-4">{t("Error:")} {error}</p>}

        {generatedAudio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-lg border"
            style={{ borderColor: colors.border }}
          >
            <p style={{ color: colors.text }}>{t("Your AI-generated music is ready!")}</p>
            <audio controls src={generatedAudio} className="w-full mt-2" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleDownload}
              className="mt-2 py-2 px-4 rounded-lg"
              style={{ backgroundColor: colors.secondary, color: "#222" }}
            >
              {t("Download Audio")}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MusicGenerator;