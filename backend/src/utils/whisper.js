// import axios from "axios";
// import fs from "fs";
// import FormData from "form-data";

// export const transcribeAudio = async (audioFiles) => {
//   const apiKey = process.env.OPENAI_API_KEY;
//   const audio = fs.createReadStream(audioFiles);
//   const url = "https://api.openai.com/v1/audio/transcriptions";

//   const formData = new FormData();
//   formData.append("file", audio);
//   formData.append("model", "whisper-1");
//   const response = await axios.post(url, formData, {
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       ...formData.getHeaders(),
//     },
//   });
//   return response.data.text;
// };
