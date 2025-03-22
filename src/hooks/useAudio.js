// useAudio.js
import { useState } from "react";

const useAudio = () => {
    const [audioData, setAudioData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    
    const apiKey = import.meta.env.VITE_KEY
    const groupId = import.meta.env.VITE_ID // Replace with your actual group ID
  const url = `https://api.minimaxi.chat/v1/t2a_v2?GroupId=${groupId}`;

  const generateAudio = async (text, options = {}) => {
    setIsLoading(true);
    setError(null);
    setAudioData(null);
  
    // Validation (unchanged)
    if (!groupId ) {
      setError("Group ID is not set. Please provide a valid Group ID.");
      setIsLoading(false);
      return;
    }
    if (!apiKey) {
      setError("API key is not set. Please provide a valid API key.");
      setIsLoading(false);
      return;
    }
    if (!text || text.trim() === "") {
      setError("Text field cannot be empty.");
      setIsLoading(false);
      return;
    }
  
    const defaultOptions = {
      model: "speech-01-hd",
      stream: false,
      subtitle_enable: true,
      voice_setting: {
        voice_id: "Grinch",
        speed: 1,
        vol: 1,
        pitch: 0,
      },
      audio_setting: {
        sample_rate: 32000,
        bitrate: 128000,
        format: "mp3",
        channel: 1,
      },
    };
  
    const payload = JSON.stringify({
      ...defaultOptions,
      text,
      ...options,
    });
  
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
  
    console.log("Request Payload:", payload);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: payload,
      });
  
      const responseData = await response.json();
      console.log("API Response:", responseData);
  
      if (!response.ok || responseData.base_resp.status_code !== 0) {
        throw new Error(
          responseData.base_resp.status_msg || "Failed to generate audio"
        );
      }
  
      if (responseData.data && responseData.data.audio) {
        // Convert hex string to bytes
        const hexString = responseData.data.audio.replace(/\s/g, "");
        const byteArray = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        
        console.log("Byte Array Length:", byteArray.length); // Should be ~85944 bytes
        console.log("First Few Bytes:", byteArray.slice(0, 10)); // Should start with ID3 (e.g., 73, 68, 51)
  
        const audioBlob = new Blob([byteArray], { type: "audio/mp3" });
        console.log("Blob Size:", audioBlob.size);
  
        if (audioBlob.size === 0) {
          throw new Error("Generated audio Blob is empty");
        }
  
        setAudioData(audioBlob);
      } else {
        throw new Error("No audio data in response");
      }
    } catch (err) {
      setError(err.message || "An error occurred while generating audio");
      console.error("Error Details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { audioData, isLoading, error, generateAudio };
};

export default useAudio;