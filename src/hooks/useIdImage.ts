import { jsPDF } from "jspdf";
import { useEffect, useState } from "react";

const PAPER_SIZE_MM = {
	L: { width: 127, height: 89 },
};

const UNIT_PHOTO_SIZE_MM = {
	"30mm_x_40mm": {
		width: 30,
		height: 40,
	},
};

const RATIO_MILLIMETER_TO_PIXEL = 11.81; // 300dpi

export function useIdImage() {
	const [rawImage, _setRawImage] = useState<string | null>(null);
	const [predictedImage, _setPredictedImage] = useState<string | null>(null);

	const setImage = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result as string;
			_setRawImage(base64);
		};
		reader.readAsDataURL(file);
	};

	// todo: crop original image feature

	useEffect(() => {
		if (!rawImage) return;

		const canvas = window.document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const unitPhotoWidth =
			UNIT_PHOTO_SIZE_MM["30mm_x_40mm"].width * RATIO_MILLIMETER_TO_PIXEL;
		const unitPhotoHeight =
			UNIT_PHOTO_SIZE_MM["30mm_x_40mm"].height * RATIO_MILLIMETER_TO_PIXEL;
		const paperWidth = PAPER_SIZE_MM.L.width * RATIO_MILLIMETER_TO_PIXEL;
		const paperHeight = PAPER_SIZE_MM.L.height * RATIO_MILLIMETER_TO_PIXEL;
		canvas.width = paperWidth;
		canvas.height = paperHeight;

		const margin = 10;
		const img = new Image();
		img.onload = () => {
			// todo: repeat and arrange the image
			ctx.drawImage(img, margin, margin, unitPhotoWidth, unitPhotoHeight);

			_setPredictedImage(canvas.toDataURL());
		};
		img.src = rawImage;
	}, [rawImage]);

	const download = () => {
		if (!predictedImage) return; // todo: handle error

		const img = new window.Image();
		img.src = predictedImage;

		img.onload = () => {
			const pdf = new jsPDF({
				orientation: "landscape",
				unit: "mm",
				format: [PAPER_SIZE_MM.L.width, PAPER_SIZE_MM.L.height],
			});

			pdf.addImage(
				img,
				"JPEG",
				0,
				0,
				PAPER_SIZE_MM.L.width,
				PAPER_SIZE_MM.L.height,
			);
			pdf.save();
		};
	};

	return {
		setImage,
		download,

		rawImage,
		predictedImage,
	};
}
