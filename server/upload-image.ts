"use server";
import { actionClient } from "@/lib/safe-action";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import z from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const formData = z.object({
  image: z.instanceof(FormData),
});

export const uploadImage = actionClient
  .schema(formData)
  .action(async ({ parsedInput: { image } }) => {
    const formImage = image.get("image");
    if (!formImage || !image) return { error: "No image provided." };
    const file = formImage as File;
    type UploadResult =
      | { success: UploadApiResponse; error?: never }
      | { success?: never; error: string };
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return new Promise<UploadResult>((resolve, reject) => {
        const uploadStrem = cloudinary.uploader.upload_stream(
          { upload_preset: "ml_default" },
          (error, result) => {
            if (error || !result) {
              reject({ error: `Upload failed: ${error}` });
            } else {
              resolve({ success: result });
            }
          }
        );
        uploadStrem.end(buffer);
      });
    } catch (err) {
      return { error: err };
    }
  });
