"use client";

import { uploadImage } from "@/server/upload-image";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const UploadImage = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/webp": [".webp"],
      "image/jpeg": [".jpeg"],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0]);
        // const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        const res = await uploadImage({ image: formData });
        console.log({ res });
      }
    },
  });

  return (
    <Card
      className={cn(
        "hover:cursor-pointer hover:bg-secondary hover:border-primary transition-all ease-in-out ",
        isDragActive && "animate-pulse border-primary bg-secondary"
      )}
      {...getRootProps()}
    >
      <CardContent className="flex flex-col h-full items-center justify-center px-2 py-24  text-xs ">
        <input {...getInputProps()} />
        <h1>Cool animation</h1>
        <p className="text-muted-foreground text-2xl">
          {isDragActive ? "DRAG HERE" : "START BY UPLOADING IMAGE"}
        </p>
        <p className="text-muted-foreground">
          Supported Formats .jpeg .jpg .png .webp
        </p>
      </CardContent>
    </Card>
  );
};

export default UploadImage;
