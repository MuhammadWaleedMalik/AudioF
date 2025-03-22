import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { t } = useTranslation();

  const colors = {
    primary: "#fde047", // Yellow
    text: "black",
    background: "#0a0a0a",
  };

  const fadeInVariant = (direction) => ({
    hidden: { opacity: 0, x: direction === "left" ? -100 : 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  });

  const blogs = [
    {
      title: "AI Audio Generation",
      content:
        "Transform your text into high-quality, lifelike audio with our AI-powered text-to-speech engine. " +
        "Generate realistic voiceovers in multiple styles and tones with natural intonations. " +
        "Perfect for podcasts, audiobooks, and content creation, ensuring professional audio output. " +
        "Customize pitch, speed, and emotional tone to match your brand voice seamlessly. " +
        "Create engaging, human-like speech without expensive recording equipment or voice actors. " +
        "Experience high-quality voice synthesis with deep learning models trained for excellence.",
    },
    {
      title: "Audio Enhancement",
      content:
        "Improve the clarity and quality of your recordings with our AI-driven audio enhancement tools. " +
        "Remove background noise, echo, and distortions for a clean, professional sound. " +
        "Automatically adjust volume levels, balance frequencies, and restore damaged audio files. " +
        "Enhance dialogue clarity for podcasts, interviews, and voice recordings with smart AI filters. " +
        "Transform low-quality recordings into studio-grade audio with a single click. " +
        "Ensure your audio sounds crisp and immersive, no matter the original quality.",
    },
    {
      title: "Speech-to-Text Transcription",
      content:
        "Convert audio into accurate, readable text with our AI-powered speech-to-text technology. " +
        "Support for multiple languages and dialects ensures seamless transcription for global audiences. " +
        "Automatically generate subtitles and captions for videos, enhancing accessibility and engagement. " +
        "Ideal for meetings, lectures, and interviews, reducing manual transcription time significantly. " +
        "AI-powered punctuation and formatting make the text ready for publication with minimal edits. " +
        "Unlock new possibilities by transforming spoken content into searchable, editable text.",
    },
    {
      title: "AI Voice Cloning",
      content:
        "Clone voices with AI-powered voice synthesis technology to create unique, personalized voice models. " +
        "Generate custom voiceovers using AI without the need for multiple recording sessions. " +
        "Maintain brand consistency by replicating a signature voice across various content formats. " +
        "AI-driven cloning ensures natural-sounding voices with precise tone and pronunciation. " +
        "Ideal for content creators, businesses, and entertainment projects seeking custom audio solutions. " +
        "Preserve and recreate voices for storytelling, digital assistants, and interactive applications.",
    },
  ];
  
  return (
    <div className="min-h-screen mb-24 bg-gray-300 mt-24 flex flex-col items-center justify-start px-6 md:px-12 pt-12 overflow-hidden">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-inkfree font-extrabold text-center w-full mb-12"
        style={{ color: colors.text }}
      >
        {t("Audio Labs Blogs")}
      </motion.h1>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            variants={fadeInVariant(index % 2 === 0 ? "left" : "right")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="p-8 rounded-xl bg-gray-700 shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.03] flex flex-col items-center text-center"
            style={{ color: "white" }}
          >
            <h3
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: colors.primary }}
            >
              {t(blog.title)}
            </h3>
            <p className="text-lg text-gray-300">{t(blog.content)}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
