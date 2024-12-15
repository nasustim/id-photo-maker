import { jsPDF } from "jspdf";
import { useState } from "react";

export function useIdImage() {
	const [rawImage, _setRawImage] = useState<string | null>(null);

	const setImage = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result as string;
			_setRawImage(base64);
		};
		reader.readAsDataURL(file);
	};

	// todo: crop original image feature
	// todo: make layout feature

	const download = () => {
		if (!rawImage) return; // todo: handle error

		const img = new window.Image();
		img.src = rawImage;

		img.onload = () => {
			const width = 89;
			const height = 127;
			const pdf = new jsPDF({
				orientation: "portrait",
				unit: "mm",
				format: [width, height],
			});

			pdf.addImage(img, "JPEG", 0, 0, width, height);
			pdf.save();
		};
	};

	return {
		setImage,
		download,

		rawImage,
	};
}
