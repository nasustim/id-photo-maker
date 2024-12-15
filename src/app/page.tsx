"use client";

import { ImageUploader } from "@/components/composites/image-uploader";
import { jsPDF } from "jspdf";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [image, setImage] = useState<string | null>(null);

	const handleUploadImage = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result as string;
			setImage(base64);
		};
		reader.readAsDataURL(file);
	};

	// todo: crop original image feature
	// todo: make layout feature

	const handleDownload = () => {
		if (!image) return; // todo: handle error

		const img = new window.Image();
		img.src = image;

		img.onload = () => {
			const width = 89;
			const height = 127;
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "mm",
				format: [width, height],
			});

			pdf.addImage(img, "JPEG", 0, 0, width, height);
			pdf.save("ID-photo.pdf");
		};
	};

	return (
		<div className="flex justify-items-center min-h-screen p-10 gap-1">
			<main className="flex-[3]">
				{!image && <ImageUploader onUpload={handleUploadImage} />}
				{image && (
					<>
						<Image src={image} width={200} height={200} alt="image" />
						<button type="button" onClick={handleDownload}>
							Download
						</button>
					</>
				)}
			</main>
			<nav className="bg-slate-600 flex-1">fff</nav>
		</div>
	);
}
