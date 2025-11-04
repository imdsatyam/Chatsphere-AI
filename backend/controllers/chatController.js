import fetch from "node-fetch";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

async function uploadToImgbb(base64) {
  const formData = new FormData();
  formData.append("image", base64.split(",")[1]);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed: " + data.error?.message);
  return data.data.url;
}

export const chatWithGroq = async (req, res) => {
  try {
    const { prompt, image } = req.body;

    const messages = [
      {
        role: "user",
        content: prompt,
      },
    ];

    if (image) {
      console.log("Uploading image...");
      const imageUrl = await uploadToImgbb(image);
      console.log("Image uploaded:", imageUrl);

      messages.push({
        role: "user",
        content: `Please describe or analyze this image: ${imageUrl}\n\nUser prompt: ${prompt}`,
      });
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API error:", data);
      throw new Error(data.error?.message || "Groq API error");
    }

    const output = data.choices?.[0]?.message?.content || "No response";
    res.json({ output });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message });
  }
};
