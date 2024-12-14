'use client'

import { ImageUploader } from "@/components/composites/image-uploader";
import { jsPDF } from "jspdf";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null)

  const handleUploadImage = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      setImage(base64)
    }
    reader.readAsDataURL(file)
  }

  // todo: crop original image feature
  // todo: make layout feature

  const handleDownload = () => {
    const img = new window.Image()
    img.src = image!

    img.onload = () => {
      const width = 89;
      const height = 127;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [width, height],
      });

      pdf.addImage(img, 'JPEG', 0, 0, width, height);
      pdf.save('ID-photo.pdf');
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {!image && <ImageUploader onUpload={handleUploadImage} />}
        {image && <><Image src={image} width={200} height={200} alt='image' /><button onClick={handleDownload}>Download</button></>}
      </main>
    </div>
  );
}
