import fetch from "node-fetch";
import FormData from "form-data";
import dotenv from "dotenv";
dotenv.config();

const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

export async function uploadToImgbb(base64) {
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
