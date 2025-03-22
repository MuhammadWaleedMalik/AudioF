import { useState } from "react";

const useAudio2Text = () => {
  const [voiceId, setVoiceId] = useState(null);
  const [instrumentalId, setInstrumentalId] = useState(null);
  const [generatedAudio, setGeneratedAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_KEY;
  const uploadUrl = "https://api.minimaxi.chat/v1/music_upload";
  const generateUrl = "https://api.minimaxi.chat/v1/music_generation";

  const uploadAudio = async (file, purpose) => {
    setIsLoading(true);
    setError(null);
    setVoiceId(null);
    setInstrumentalId(null);

    if (!apiKey) {
      setError("API key is missing.");
      setIsLoading(false);
      return;
    }
    if (!file) {
      setError("Please provide an audio file.");
      setIsLoading(false);
      return;
    }
    if (!["song", "voice", "instrumental"].includes(purpose)) {
      setError("Invalid purpose. Use 'song', 'voice', or 'instrumental'.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("purpose", purpose);
    formData.append("file", file);

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload Response:", JSON.stringify(data, null, 2));

      if (!response.ok || data.base_resp.status_code !== 0) {
        throw new Error(data.base_resp.status_msg || "Upload failed");
      }

      setVoiceId(data.voice_id || null);
      setInstrumentalId(data.instrumental_id || null);
    } catch (err) {
      setError(err.message || "An error occurred during upload");
    } finally {
      setIsLoading(false);
    }
  };

  const generateMusic = async (lyrics, referVoice = voiceId, referInstrumental = instrumentalId) => {
    setIsLoading(true);
    setError(null);
    setGeneratedAudio(null);

    if (!apiKey) {
      setError("API key is missing.");
      setIsLoading(false);
      return;
    }
    if (!referVoice && !referInstrumental) {
      setError("At least one of refer_voice or refer_instrumental is required.");
      setIsLoading(false);
      return;
    }
    if (!lyrics || lyrics.trim() === "") {
      setError("Lyrics are required.");
      setIsLoading(false);
      return;
    }

    const payload = {
      refer_voice: referVoice || undefined,
      refer_instrumental: referInstrumental || undefined,
      lyrics,
      model: "music-01",
      audio_setting: { // Changed to object instead of string
        sample_rate: 44100,
        bitrate: 256000,
        format: "mp3",
      },
    };

    console.log("Generation Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(generateUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text(); // Log raw response text
      console.log("Raw Generation Response:", rawText);

      const data = JSON.parse(rawText); // Parse after logging
      console.log("Parsed Generation Response:", JSON.stringify(data, null, 2));

      if (!response.ok || data.base_resp.status_code !== 0) {
        throw new Error(data.base_resp.status_msg || "Music generation failed");
      }

      if (data.data && data.data.audio) {
        const hexString = data.data.audio.replace(/\s/g, "");
        console.log("Audio Hex Length:", hexString.length);
        const byteArray = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        console.log("Byte Array Length:", byteArray.length);
        const audioBlob = new Blob([byteArray], { type: "audio/mp3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("Audio Blob Size:", audioBlob.size);
        setGeneratedAudio(audioUrl);
      } else {
        throw new Error("No audio data in response");
      }
    } catch (err) {
      setError(err.message || "An error occurred during music generation");
      console.error("Generation Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadAudio,
    generateMusic,
    voiceId,
    instrumentalId,
    generatedAudio,
    isLoading,
    error,
  };
};

export default useAudio2Text;