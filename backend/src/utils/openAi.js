import axios from "axios";

// OpenRouter chat completion (AI assistant)
export const openai = async (prompt) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const response = await axios.post(
    url,
    {
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0]?.message?.content || "";
};

// OpenRouter speech-to-text (Whisper)
export const openaiWhisper = async (audioBuffer) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const url = "https://openrouter.ai/api/v1/audio/transcriptions";
  const formData = new FormData();
  formData.append("file", audioBuffer, "audio.wav");
  formData.append("model", "openai/whisper-large-v3");
  const response = await axios.post(url, formData, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...formData.getHeaders ? formData.getHeaders() : {},
    },
  });
  return response.data.text || "";
};
