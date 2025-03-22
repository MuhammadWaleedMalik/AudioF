import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      title: "Text-to-Audio 🎤",
      description: "Convert written text into realistic AI-generated voices with natural intonation.",
    },
    {
      title: "Audio-to-Text 📝",
      description: "Transcribe audio with high accuracy, multi-language support, and smart formatting.",
    },
    {
      title: "AI Audio Generation 🎶",
      description: "Create AI-generated music, sound effects, and custom voiceovers effortlessly.",
    },
    {
      title: "Audio Enhancement 🎧",
      description: "Improve sound quality, remove noise, and fine-tune your recordings seamlessly.",
    },
  ];

  return (
    <div className="w-full min-h-screen overflow-auto snap-y snap-mandatory">
   
   
      {/* Page 1 - Website Name & Slogan */}
      <div className="h-screen flex flex-col items-center justify-center bg-gray-300 text-black snap-start relative">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-[164px]  font-inkfree font-extrabold drop-shadow-lg animate-pulse"
      >
        Audio Labs
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="text-2xl mt-4 italic"
      >

          Mix and Fix, Lyrical Kicks
      </motion.p>

      {/* Button */}
      <Link to="/aboutus" 
      
      className="mt-6 px-6 py-3 bg-white text-yellow-300 
      font-semibold rounded-lg shadow-md hover:bg-gray-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
        
      >
        Learn More
      </Link>

      {/* Animated Circles */}
      <motion.div
        whileHover={{ scale: 0.85, backgroundColor: "#FFC107" }}
        className="absolute top-20 left-16 w-24 h-24 border-[2px] border-black rounded-full"
      />
      <motion.div
        whileHover={{ scale: 0.85, backgroundColor: "#FFC107" }}
        className="absolute bottom-44 right-20 w-28 h-28 border-[2px] border-black rounded-full"
      />
      <motion.div
        whileHover={{ scale: 0.85, backgroundColor: "#FFC107" }}
        className="absolute top-[82%] left-0/3 w-20 h-20 border-[2px] border-black rounded-full"
      />
      <motion.div
        whileHover={{ scale: 0.85, backgroundColor: "#FFC107" }}
        className="absolute bottom-10 left-[15%] w-32 h-32 border-[2px] border-black rounded-full"
      />
      <motion.div
        whileHover={{ scale: 0.85, backgroundColor: "#FFC107" }}
        className="absolute top-[13%] right-[4%] w-36 h-36 border-[2px] border-black rounded-full"
      />
    </div>








      {/* Page 2 - Crime Scene Strips */}
      <div className="relative h-screen mt-0 mb-24 overflow-hidden bg-gray-300 flex items-center justify-center  snap-start">
        {/* Crime Scene Strips */}
        {[
          { text: "Mix and Fix, Lyrical Kicks", delay: 0.3 },
          { text: "Audio Labs", delay: 0 },
          { text: "Mix and Fix, Lyrical Kicks", delay: 0.6 },
          { text: "Audio Labs", delay: 0.2 },
          { text: "Mix and Fix, Lyrical Kicks", delay: 0.9 },
          { text: "Audio Labs", delay: 0.4 },
      
        ].map((strip, i) => (
          <motion.div
            key={i}
            initial={{ x: i % 2 === 0 ? "-100vw" : "100vw", rotate: Math.random() * 30 - 15 }}
            whileInView={{ x: 0 }}
            exit={{ x: i % 2 === 0 ? "-100vw" : "100vw" }}
            transition={{ duration: 1.5, delay: strip.delay }}
            className="absolute w-[150%] h-12 bg-yellow-400 text-black font-bold flex items-center justify-center transform rotate-45 border-dashed border-4 border-black shadow-lg"
            style={{ top: `${30 + i * 15}%` }}
          >
            {strip.text}
          </motion.div>
        ))}
      </div>



      {/* Page 3 - Animated Merging Divs */}
     
   <div className="relative min-h-screen flex items-center justify-center bg-gray-300 snap-start overflow-hidden px-6">
      {/* Left Side Div */}
      <motion.div
        initial={{ x: "-50vw" }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-0 top-0 bottom-0 w-1/2 md:w-1/3 bg-blue-600 flex items-center justify-center text-white text-5xl md:text-7xl font-extrabold rounded-r-xl shadow-lg"
      >
        Audiolabs
      </motion.div>

      {/* Right Side Div */}
      <motion.div
        initial={{ x: "100vw" }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute right-0 top-0 bottom-0 w-1/2 md:w-1/3 bg-blue-900 flex items-center justify-center text-black text-5xl md:text-7xl font-extrabold rounded-l-xl shadow-lg"
      >
        AI
      </motion.div>

      {/* Center Description Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative bg-white text-black text-lg md:text-2xl font-medium px-8 py-6 rounded-xl shadow-2xl max-w-3xl text-center"
      >
        <h2 className="text-4xl text-yellow-400 md:text-5xl font-extrabold mb-4">Audiolabs</h2>
        <p className="leading-relaxed">
          Mix and Fix, Lyrical Kicks 🎵  
          Unlock the power of AI-driven audio with Audiolabs, your go-to platform for text-to-audio conversion, 
          audio-to-text transcription, AI-generated sound, and audio enhancement.  
          Whether you're creating music, podcasts, or voiceovers, Audiolabs ensures crystal-clear, high-quality 
          sound with cutting-edge AI technology. 🚀🎶
        </p>
      </motion.div>
    </div>







      {/* Page 4 - Animated Merging Divs */}

    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300 px-6 py-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-10 text-center">
        Audiolabs Features 🚀
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-3">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>


    </div>
  );
};

export default Home;
